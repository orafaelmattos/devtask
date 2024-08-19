import './admin.css'
import { useState, useEffect } from 'react'

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';

import { toast } from 'react-toastify';

import { addDoc, updateDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc } from 'firebase/firestore';

export default function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, 'Tarefas')
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    console.log(lista);
                    setTarefas(lista);
                })
            }
        }
        loadTarefas();
    },[])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput === ""){
            toast.error("Digite sua tarefa")
            return
        }

        if(edit?.id){
            handleUptadeTarefa();
            return
        }

        await addDoc(collection(db, 'Tarefas'), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            toast.success("Tarefa Registrada");
            setTarefaInput('')
            
        })
        .catch((error) => {
            toast.error("Não foi possível cadastrar, tente novamente")
            console.log('Não foi possível cadastrar, o erro foi: ' + error);
            
        })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deleteTarefa(id){
        const docRef = doc(db, 'Tarefas', id)
        await deleteDoc(docRef)
        toast.success("Tarefa concluída")
    }

    function editTarefa(item){
        setTarefaInput(item.tarefa);
        setEdit(item);
    }

    async function handleUptadeTarefa(){
        const docRef = doc(db, 'Tarefas', edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            toast.success("Tarefa editada")
            setTarefaInput('')
            setEdit({})
        })
        .catch((e) => {
            console.log(e);
            toast.error("Tente novamente editar sua tarefa")
            setTarefaInput('')
            setEdit({})
        })
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea
                placeholder='Digite sua tarefa'
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}/>

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{backgroundColor: '#6add39'}} type='submit'>Editar tarefa</button>
                ): (
                    <button className='btn-register' type='submit'>Registrar tarefa</button>
                )}
            </form>

            {
                tarefas.map((item) => {
                    return(
                        <article key={item.id} className='list'>
                            <p>{item.tarefa}</p>

                            <div>
                                <button onClick={() => deleteTarefa(item.id)} className='btn-delete'>Concluir</button>
                                <button onClick={() => editTarefa(item)} className='btn-join'>Editar</button>
                            </div>
                        </article>
                    )
                })
            }

            <button onClick={handleLogout} className='btn-logout'>Sair</button>
        </div>
    )
}
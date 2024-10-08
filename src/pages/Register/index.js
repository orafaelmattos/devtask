import './register.css'

import { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', {replace: true})
      })
      .catch(() => {
        toast.error("Erro ao cadastrar, tente novamente")
      })
    }else{
      toast.error("Preencha todos os campos para fazer o cadastro")
    }
    setEmail('')
    setPassword('')
  }

    return (
      <div className="home-container">
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta</span>
        
        <form className="form" onSubmit={handleRegister}>
          <input type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>

          <input type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit">Cadastrar</button>
        </form>

        <Link className="button-link" to='/'>Já possui uma conta? Faça o login!</Link>
      </div>
    );
  }
  
  export default Register;
  
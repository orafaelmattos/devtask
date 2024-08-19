import { useState } from "react"
import './home.css'
import { Link } from "react-router-dom"
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Logo from '../../assets/logo.png'

function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', { replace: true })
      })
      .catch(() =>{
        toast.error("Erro ao fazer o login, tente novamente")
      })
    }else{
      toast.error("Preencha todos os campos para fazer o login")
    }
    setEmail('')
    setPassword('')
  }

    return (
      <div className="home-container">
        <section className="app-name">
          <img src={Logo} className="logo"/>
          <h1 className="app-title">DevTask</h1>
        </section>
        <h2>Lista de Tarefas</h2>
        <span>Gerencie sua agenda de forma fácil</span>
        
        <form className="form" onSubmit={handleLogin}>
          <input type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>

          <input type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit">Acessar</button>
        </form>

        <Link className="button-link" to='/register'>Não possui uma conta? Cadastre-se</Link>
      </div>
    );
  }
  
  export default Home;
  
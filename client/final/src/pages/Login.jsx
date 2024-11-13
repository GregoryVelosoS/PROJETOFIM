// Importação dos components do react-bootstrap utilizados
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

// Importação do useState pra monitorar as variáveis
import { useState } from "react";

// Importação do useNavigate pra mudança da página
import { useNavigate } from "react-router-dom";

const Login = () => {
  // variaveis pro usuario
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");
  const [alertaVariant, setAlertaVariant] = useState("danger");

  // variavel pro navigate
  const navigate = useNavigate();

  // gravar usuário no localStorage
  const gravarLocalStorage = (usuario) => {
    localStorage.setItem("userName", usuario.usu_nome);
    localStorage.setItem("userEmail", usuario.usu_email);
    localStorage.setItem("userTipo", usuario.usu_tipo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email != "") {
      if (senha != "") {
        // Cria um objeto com as informações preenchidas
        const user = { email, senha };

        // Passa as informações via query na url
        const url = new URL("http://localhost:5000/usuario/entrar/");
        url.search = new URLSearchParams(user).toString();

        // Faz a requisição a api pra criar o pegar o usuário
        const req = await fetch(url, {
          method: "GET",
        });

        //Guarda o retorno da requisição na variável res
        const res = req.json();

        //Caso o retorno da requisição seja vazia, não achou usuário com aquelas credenciais, se achou loga
        res
          .then((resultado) => {
            if (resultado.includes("incorretas")) {
              setAlertaClass("mb-3");
              setAlertaMensagem("Usuário ou senha inválidos");
            } else {
              setAlertaClass("mb-3");
              setAlertaMensagem("Login efetuado com Sucesso");
              setAlertaVariant("success");
              const usuario = JSON.parse(resultado)
              gravarLocalStorage(usuario[0]);
              alert("Login efetuado com Sucesso");
              setEmail("");
              setSenha("");
              navigate("/home");
            }
            // console.log(resultado);
          })
          .catch((erro) => console.error(erro));
      } else {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo senha não pode ser vazio");
      }
    } else {
      setAlertaClass("mb-3");
      setAlertaMensagem("O campo email não pode ser vazio");
    }
  };

  return (
    <div>
      <Container>
        {/* Logo*/}
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "100px" }}
        >
          login
        </span>
        <form onSubmit={handleLogin}>
          {/* caixinha do email */}
          <FloatingLabel
            controlId="floatingInputEmail"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FloatingLabel>

          {/* caixinha da senha */}
          <FloatingLabel
            controlId="floatingPassword"
            label="Senha"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
          </FloatingLabel>

        {/* Alerta, caso possua algum erro*/}
          <Alert key="danger" variant={alertaVariant} className={alertaClass}>
            {alertaMensagem}
          </Alert>

        {/* Botão pra enviar o formulário*/}
          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>

        <p>
          Não tem cadastro?
          <Nav.Link
            href="/cadastrar"
            style={{
              color: "blue",
              textDecoration: "underline",
              display: "inline-block",
              marginLeft: "5px",
            }}
          >
            Cadastrar-se
          </Nav.Link>
        </p>
      </Container>
    </div>
  );
};

export default Login;

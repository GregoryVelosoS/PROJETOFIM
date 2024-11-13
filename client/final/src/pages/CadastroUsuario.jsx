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

const CadastroUsuario = () => {
  // variaveis pro usuario
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("gerente");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");

  // variavel pro navigate
  const navigate = useNavigate();

  // Função pra lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificações de campo
    if (!nome == "") {
      if (!email == "") {
        if (!senha == "" && !confirmaSenha == "" && senha === confirmaSenha) {
          
          // Cria um objeto com as informações preenchidas
          const user = { nome, email, senha, tipo };
          
          // Faz a requisição a api pra criar o usuário
          const req = await fetch("http://localhost:5000/usuario/criar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          
          //Guarda o retorno da requisição na variável res
          const res = req.json();

          //Caso o retorno da requisição tenha "usu_email", significa que já existe um usuário com este email, logo não posso cadastrá-lo
          res.then((resultado) => {
              if (resultado.includes("usu_email")) {
                setAlertaClass("mb-3");
                setAlertaMensagem("Já existe usuário com este email cadastrado")
              } 
              else {
                alert("Usuário cadastrado com sucesso");
                setNome("");
                setEmail("");
                setSenha("");
                setConfirmaSenha("");
                setTipo("");
                navigate("/login");
              }
              console.log(resultado);
            })
            .catch((erro) => console.error(erro));
        } else {
          setAlertaClass("mb-3");
          setAlertaMensagem("As senhas não são iguais");
        }
      } else {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo email não pode ser vazio");
      }
    } else {
      setAlertaClass("mb-3");
      setAlertaMensagem("O campo nome não pode ser vazio");
    }
  };

  return (
    <div>
      <Container>
        {/* Logo*/}
        <span className="material-symbols-outlined" style={{ fontSize: "100px" }}>
          person_add
        </span>
        <form onSubmit={handleSubmit}>
          {/* caixinha do nome */}
          <FloatingLabel
            controlId="floatingInputName"
            label="Nome"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
          </FloatingLabel>

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

          {/* caixinha da confirmação da senha */}
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirme a senha"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirmaSenha}
              onChange={(e) => {
                setConfirmaSenha(e.target.value);
              }}
            />
          </FloatingLabel>

          {/* select da tipo de usuario*/}
          <Form.Group controlId="formGridTipo" className="mb-3">
            <Form.Label>Tipo de usuário</Form.Label>
            <Form.Select
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
              }}
            >
              <option value="gerente">Gerente</option>
              <option value="funcionario">Funcionário</option>
            </Form.Select>
          </Form.Group>

        {/* Alerta, caso possua algum erro*/}
          <Alert key="danger" variant="danger" className={alertaClass}>
            {alertaMensagem}
          </Alert>

        {/* Botão pra enviar o formulário*/}
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </form>
        <p>
          Já tem cadastro? 
          <Nav.Link
            href="/login"
            style={{ color: "blue", textDecoration: "underline", display:"inline-block", marginLeft:"5px" }}
          >
          Login
          </Nav.Link>
        </p>
      </Container>
    </div>
  );
};

export default CadastroUsuario;
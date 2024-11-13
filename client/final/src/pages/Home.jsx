// Importação dos components do react-bootstrap utilizados
import CardProduto from "../components/CardProduto";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Importação do useState pra monitorar as variáveis
import { useState, useEffect } from "react";

// Importação do useNavigate pra mudança da página
import { useNavigate } from "react-router-dom";

const Home = () => {
  // variavel pro navigate
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState("Todos");
  const [cats, setCats] = useState([]);
  // Resgate de dados da api para preencher o select de categoria
  useEffect(() => {
    async function fetchData() {
      try {
        // busca os dados
        const req = await fetch("http://localhost:5000/produtos/categorias");
        // converte o resultado pra json
        const categoria = await req.json();
        setCats(categoria);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  // variavel pra guardar os produtos vindo do banco
  const [produtos, setProdutos] = useState([]);

  // Resgate de dados da api para pegar os produtos
  useEffect(() => {
    async function fetchData() {
      try {
        // busca os dados
        const res = await fetch("http://localhost:5000/produtos");
        // converte o resultado pra json
        const prods = await res.json();
        setProdutos(prods);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    console.log(categoria);

  }, [categoria]);

  return (
    <div>
      <Container>
        <h1>Lista de produtos</h1>

        <div className="d-grid col-2 gap-2 d-inline-flex justify-content-center">
          <Button
            variant="primary"
            size="lg"
            className="mb-3 d-inline-flex justify-content-center"
            onClick={() => {
              navigate("/produto/cadastrar/");
            }}
          >
            <span
              className="material-symbols-outlined flex"
              style={{ fontSize: "30px" }}
            >
              add_circle
            </span>
            Cadastrar
          </Button>
        </div>

        {/* select da categoria*/}
        <Form.Group controlId="formGridTipo" className="mb-3">
          <Form.Label>Tipo de produto</Form.Label>
          <Form.Select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            <option value="Todos">Todos</option>
            {cats.map((cat) => (
              <option key={cat.cat_id} value={cat.cat_nome}>
                {cat.cat_nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="lista-produtos mt-3 d-grid col-12 gap-2 d-flex justify-content-start flex-wrap">
          {produtos.map((prod) =>
            categoria === "Todos" || prod.cat_nome === categoria ? (
              <CardProduto
                key={prod.it_id}
                id={prod.it_id}
                nome={prod.it_nome}
                descricao={prod.it_desc}
                preco={prod.it_preco}
                data={prod.it_dt_cad}
                categoria={prod.cat_nome}
                imagemUrl={`http://localhost:5000/images/${prod.it_imagem}`} // Caminho completo da imagem
              />
            ) : null
          )}
        </div>
      </Container>
    </div>
  );
};

export default Home;

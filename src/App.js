import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  // Estado para armazenar o nome de usuário pesquisado
  const [username, setUsername] = useState("");
  // Estado para armazenar os dados do usuário do GitHub
  const [userData, setUserData] = useState(null);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);

  // Função para lidar com a pesquisa de usuário
  const handleSearch = () => {
    if (username === "") {
      // Se o campo de nome de usuário estiver vazio, limpe os estados e retorne
      setUserData(null);
      setError(null);
      return;
    }

    // Faça uma chamada à API do GitHub para buscar os dados do usuário
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuário não encontrado");
        }
        return response.json();
      })
      .then((data) => {
        // Defina os dados do usuário e limpe qualquer erro
        setUserData(data);
        setError(null);
      })
      .catch((err) => {
        // Em caso de erro, limpe os dados do usuário e defina a mensagem de erro
        setUserData(null);
        setError(err.message);
      });
  };

  return (
    <div className="App">
      <h1>Username no Github</h1>
      <hr />
      {/* Input para inserir o nome de usuário */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite seu user"
      />
      {/* Botão para iniciar a pesquisa */}
      <button onClick={handleSearch}>Pesquisar</button>
      <hr />
      {/* Condicionalmente renderiza a mensagem de erro ou os detalhes do usuário */}
      {error ? (
        <p className="error">{error}</p>
      ) : userData ? (
        <UserDetails userData={userData} username={username} />
      ) : null}
    </div>
  );
}

// Componente funcional UserDetails que exibe os detalhes do usuário
function UserDetails({ userData, username }) {
  return (
    <div>
      {/* Exibe o nome de usuário */}
      <h2>{userData.login}</h2>
      {/* Exibe o avatar do usuário */}
      <img src={userData.avatar_url} alt="Avatar" className="avatar" />
      {/* Exibe o ID do usuário */}
      <p>ID: {userData.id}</p>
      <p>
        {/* Adicione o link para o perfil no GitHub com o nome de usuário pesquisado */}
        <a href={userData.html_url}>{username}</a>
      </p>
    </div>
  );
}

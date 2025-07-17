import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importando o CSS para estilização

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState(""); // Estado para armazenar o título da tarefa
  const [message, setMessage] = useState(""); // Estado para mostrar mensagens de sucesso ou erro
  const [showTasks, setShowTasks] = useState(false); // Estado para controlar se as tarefas serão exibidas

  // Função para buscar tarefas do backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data); // Atualiza a lista de tarefas
    } catch (error) {
      console.error('Erro ao buscar tarefas', error);
    }
  };

  // Função para adicionar uma nova tarefa
  const addTask = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit do formulário

    if (!taskTitle.trim()) return; // Não permite enviar uma tarefa vazia

    try {
      // Envia os dados para o backend
      await axios.post('http://localhost:5000/tasks', { title: taskTitle, completed: false });
      setTaskTitle(""); // Limpa o campo do título após o envio

      // Recarrega as tarefas após adicionar
      fetchTasks(); 

      // Exibe uma mensagem de sucesso
      setMessage("Tarefa adicionada com sucesso!");
    } catch (error) {
      console.error('Erro ao adicionar tarefa', error);

      // Exibe uma mensagem de erro
      setMessage("Erro ao adicionar a tarefa. Tente novamente.");
    }
  };

  // Carregar as tarefas assim que o componente for montado
  useEffect(() => {
    fetchTasks();
  }, []); // O array vazio [] faz com que o efeito rode apenas uma vez, no carregamento inicial

  // Função para alternar a visibilidade das tarefas
  const toggleTasksVisibility = () => {
    setShowTasks(!showTasks); // Alterna entre verdadeiro e falso
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      {/* Formulário para adicionar tarefa */}
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>

      {/* Exibindo a mensagem de sucesso ou erro */}
      {message && <p>{message}</p>}

      {/* Botão para alternar a exibição da lista */}
      <button onClick={toggleTasksVisibility}>
        {showTasks ? 'Esconder Lista de Tarefas' : 'Mostrar Lista de Tarefas'}
      </button>

      {/* Exibir o card com a lista de tarefas se 'showTasks' for verdadeiro */}
      {showTasks && (
        <div className="task-card">
          <h2>Tarefas</h2>
          <ul>
            {tasks.length === 0 ? (
              <li>Sem tarefas para exibir.</li> // Mensagem caso não haja tarefas
            ) : (
              tasks.map((task) => (
                <li key={task.id}>
                  {task.title} - {task.completed ? 'Concluída' : 'Pendente'}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;

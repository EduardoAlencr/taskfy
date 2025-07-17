from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Função para conectar ao banco de dados SQLite
def get_db_connection():
    conn = sqlite3.connect('tasks.db')
    conn.row_factory = sqlite3.Row
    return conn

# Rota para listar as tarefas
@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    tasks = conn.execute('SELECT * FROM tasks').fetchall()
    conn.close()
    return jsonify([dict(task) for task in tasks])

# Rota para adicionar uma nova tarefa
@app.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.get_json()  # Obtém os dados enviados pelo React (JSON)
    print(f'Recebido: {new_task}')  # Verifica o que foi recebido
    
    title = new_task.get('title')
    completed = new_task.get('completed')
    
    if not title or completed is None:  # Valida se os dados são válidos
        print('Erro: Dados inválidos')
        return jsonify({"message": "Dados inválidos."}), 400
    
    conn = get_db_connection()
    conn.execute('INSERT INTO tasks (title, completed) VALUES (?, ?)', (title, completed))
    conn.commit()
    conn.close()

    print(f'Tarefa adicionada: {title}')  # Confirma a adição
    return jsonify({"message": "Tarefa criada com sucesso!"}), 201
# Rota para atualizar uma tarefa

if __name__ == '__main__':
    app.run(debug=True)

import sqlite3

# Criar banco de dados e a tabela de tarefas
def create_db():
    conn = sqlite3.connect('tasks.db')
    conn.execute('''
        CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN NOT NULL
        );
    ''')
    conn.close()

if __name__ == '__main__':
    create_db()

import React, { useState } from 'react';
import { Plus, Check, Trash2, Calendar, CheckCircle2, Circle, Filter } from 'lucide-react';

export default function App() {
  // 1. State Management
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Refactor Auth Context', category: 'Dev', completed: false, dueDate: 'Today' },
    { id: 2, title: 'Design Loan Management API DTO', category: 'Backend', completed: true, dueDate: 'Yesterday' },
    { id: 3, title: 'Learn React Router & Custom Hooks', category: 'Study', completed: false, dueDate: 'Tomorrow' },
  ]);

  const [inputTitle, setInputTitle] = useState('');
  const [inputCategory, setInputCategory] = useState('Dev');
  const [filter, setFilter] = useState('ALL'); // ALL, ACTIVE, COMPLETED

  // TODO: 1. Buat fungsi untuk menambah task baru dari form
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputTitle.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: inputTitle,
      category: inputCategory,
      completed: false,
      dueDate: 'Today', // Atur tanggal sesuai kebutuhan
    };
    setTasks([newTask, ...tasks]);
    setInputTitle('');
    setInputCategory('Dev'); // Reset kategori ke default
  };

  // TODO: 2. Buat fungsi untuk mengubah status completed (true/false) dari task
  const handleToggleTask = (id) => {
    // Tulis logikamu di sini...
  };

  // TODO: 3. Buat fungsi untuk menghapus task berdasarkan ID
  const handleDeleteTask = (id) => {
    // Tulis logikamu di sini...
  };

  // TODO: 4. Buat logika filter (ALL / ACTIVE / COMPLETED) untuk array tasks
  const filteredTasks = tasks; // ganti variabel ini dengan logika .filter() kamu

  // TODO: 5. Hitung jumlah task yang belum selesai (completed == false)
  const activeCount = 0; // ganti ini dengan logika perhitunganmu

  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-10 px-4">
      {/* Container Utama */}
      <div className="w-full max-w-2xl bg-slate-800 border border-slate-700/60 rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-700/60 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Task Workspace</h1>
            <p className="text-sm text-slate-400 mt-1">
              Kamu punya <span className="text-indigo-400 font-semibold">{activeCount} task</span> pending hari ini.
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            TM
          </div>
        </header>

        {/* Input Form (Tambahkan Task Baru) */}
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ketik task baru kamu..."
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition"
          />
          <select
            value={inputCategory}
            onChange={(e) => setInputCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-3 text-sm text-slate-300 outline-none transition"
          >
            <option value="Dev">Dev</option>
            <option value="Backend">Backend</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Plus size={18} />
            <span>Tambah</span>
          </button>
        </form>

        {/* Filter Navigation */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Filter size={16} />
            <span>Filter:</span>
          </div>
          <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700/50">
            {['ALL', 'ACTIVE', 'COMPLETED'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filter === type
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* List Task */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-700 rounded-xl">
              <p className="text-slate-500 text-sm">Tidak ada task dalam kategori ini.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                  task.completed
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                {/* Bagian Kiri: Checkbox & Judul */}
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="text-slate-500 hover:text-indigo-400 transition flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 size={22} className="text-indigo-500 fill-indigo-500/20" />
                    ) : (
                      <Circle size={22} />
                    )}
                  </button>

                  <div className="truncate">
                    <p
                      className={`text-sm font-medium truncate ${
                        task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-indigo-400">
                        {task.category}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar size={12} /> {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bagian Kanan: Actions */}
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                    title="Hapus Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <footer className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
          <span>Total: {tasks.length} task</span>
          <span>Dibuat dengan React + Tailwind</span>
        </footer>

      </div>
    </div>
  );
}
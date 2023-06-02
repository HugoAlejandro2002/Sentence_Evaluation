import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseapp } from '../services/firebase';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth(firebaseapp);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const auth = getAuth(firebaseapp);
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            setError('Error al iniciar sesión con Google.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-16">
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Iniciar sesión
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
            {/* <button onClick={handleGoogleLogin} className="bg-red-500 text-white rounded px-4 py-2 mt-4 flex items-center">
                <FaGoogle className="mr-2" />
                Iniciar sesión con Google
            </button> */}
        </div>
    );
};

export default Login;

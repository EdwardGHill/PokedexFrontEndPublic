import Register from '../components/Register';

const RegisterPage = ({ onRegister }) => {
  return (
    <div className="bg-gradient-to-br from-red-100 to-gray-50 min-h-screen p-4">
      <img src={"/dex.png"} alt="Pokedex Logo" className="w-3/4 mx-auto mb-4" />
      <Register onRegister={onRegister} />
    </div>
  );
};

export default RegisterPage;
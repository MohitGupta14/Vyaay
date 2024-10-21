import Link from "next/link"

const Navbar: React.FC = () => {

    return(
        <nav className="bg-white shadow-md fixed top-2 left-2 right-2 w-full rounded-lg z-10 ">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">𝘝𝘺𝘢𝘢𝘺</h1>
          <div className="space-x-5">
            <Link href="/login" className="font-semibold text-darkGreen hover:text-gray-900">
              Login
            </Link>
            <Link href="/signup">
            <span className="px-5 py-2 bg-btnGreen text-white font-semibold rounded-lg shadow-md hover:bg-darkGreen cursor-pointer">
               Sign up
            </span>
            </Link>
          </div>
        </div>
      </nav>    )
}

export default Navbar
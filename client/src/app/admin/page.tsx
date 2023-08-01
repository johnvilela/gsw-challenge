import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

export default function AdminPage() {

  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 p-8 rounded-3xl">
        <h1 className="text-left uppercase text-3xl mb-8 text-teal-50">
          <strong>
            Painel ADMIN
          </strong>
        </h1>
        <h2 className="text-teal-100 mb-4 uppercase">Amount of notes</h2>
        <form className="grid gap-2 grid-cols-2 grid-rows-2">
          <Textfield label="R$ 100" />
          <Textfield label="R$ 50" />
          <Textfield label="R$ 20" />
          <Textfield label="R$ 5" />
          <div className="col-span-2 mt-2">
            <Button>
              Save update
            </Button>
          </div>
        </form>

        <div className="w-full border-b-2 border-teal-100 my-12" />

        <h2 className="text-teal-100 mb-4 uppercase">Manage users</h2>

        <form className="grid gap-2 grid-cols-2 grid-rows-2">
          <Textfield label="Name" />
          <Textfield label="Email" />
          <div className="col-span-2 mt-2">
            <Button>
              Create user
            </Button>
          </div>
        </form>

        <ul>
          <li className="py-4 border-b border-teal-300 flex justify-between items-center text-teal-100">
            <p>User name</p>
            <button type='button'>
              <MdDelete size='1.5rem' />
            </button>
          </li>
          <li className="py-4 border-b border-teal-300 flex justify-between items-center text-teal-100">
            <p>User name</p>
            <button type='button'>
              <MdDelete size='1.5rem' />
            </button>
          </li>
          <li className="py-4 border-b border-teal-300 flex justify-between items-center text-teal-100">
            <p>User name</p>
            <button type='button'>
              <MdDelete size='1.5rem' />
            </button>
          </li>
        </ul>

        <Link href='/' className="flex justify-center items-center w-full p-4 font-bold text-teal-50">
          Go back
        </Link>
      </div>
    </main>
  )
}
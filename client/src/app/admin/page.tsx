import { Button } from "@/components/inputs/Button";
import { Textfield } from "@/components/inputs/Textfield";
import Link from "next/link";

export default function AdminPage() {

  return (
    <main className="grid min-h-screen place-content-center p-4 bg-teal-200">
      <div className="bg-teal-700 p-8 rounded-3xl">
        <h1 className="text-left uppercase text-3xl mb-8 text-teal-50">
          <strong>
            Painel ADMIN
          </strong>
        </h1>
        <h2 className="text-teal-100 mb-4">Quantidade de notas</h2>
        <form className="grid gap-2 grid-cols-2 grid-rows-2">
          <Textfield label="R$ 100" />
          <Textfield label="R$ 50" />
          <Textfield label="R$ 20" />
          <Textfield label="R$ 5" />
          <div className="col-span-2 mt-2">
            <Button>
              Salvar
            </Button>
          </div>
        </form>
        <Link href='/' className="flex justify-center items-center w-full p-4 font-bold text-teal-50">
          Sair
        </Link>
      </div>
    </main>
  )
}
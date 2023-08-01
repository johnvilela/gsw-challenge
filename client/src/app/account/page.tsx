import { Button } from "@/components/inputs/Button";
import Link from "next/link";
import { HiOutlineArrowTrendingDown, HiOutlineArrowTrendingUp } from "react-icons/hi2";

export default function Account() {
  return (
    <main className="grid min-h-screen grid-cols-1 grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 p-4 bg-teal-200">
      <section className="col-span-1 flex flex-col justify-between bg-teal-700 rounded-3xl p-8">
        <div>
          <h1 className="text-xl text-teal-200 mb-8">Bem vindo <strong>João</strong>!</h1>
          <p className="text-xl text-teal-200">Seu saldo é de: <br />
            <strong className="text-5xl text-teal-100">R$10.000,00</strong>
          </p>
        </div>
        <Link href='/account/withdrawn' className="w-full bg-pink-500 font-bold text-white rounded-full mt-4 flex justify-center items-center py-4 lg:py-8 text-2xl cursor-pointer hover:brightness-75">
          Sacar dinheiro
        </Link>
      </section>
      <section className="mt-8 lg:mt-0 lg:p-8 col-span-2">
        <h2 className="text-xl text-teal-950 mb-8 font-bold">Extrato</h2>
        <ul className="w-full">
          <li className="w-full flex items-center gap-4 bg-yellow-200 text-yellow-950 text-xl p-6 rounded-3xl mb-4">
            <div className="bg-yellow-700 w-12 h-12 rounded-xl flex justify-center items-center text-yellow-200">
              <HiOutlineArrowTrendingUp size='2rem' />
            </div>
            <div className="flex flex-1 justify-between">
              <p>Depósito</p>
              <p className="font-bold">-R$2.000</p>
            </div>
          </li>
          <li className="w-full flex items-center gap-4 bg-pink-200 text-pink-950 text-xl p-6 rounded-3xl mb-4">
            <div className="bg-pink-700 w-12 h-12 rounded-xl flex justify-center items-center text-pink-200">
              <HiOutlineArrowTrendingDown size='2rem' />
            </div>
            <div className="flex flex-1 justify-between">
              <p>Saque</p>
              <p className="font-bold">-R$2.000</p>
            </div>
          </li>
        </ul>
      </section>
    </main>
  )
}
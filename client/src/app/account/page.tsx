'use client';

import { Button } from "@/components/inputs/Button";
import { useAccount } from "@/hooks/useAccount";
import { ACCOUNT_MOVEMENT_TYPE } from "@/types/AccountMovement";
import Link from "next/link";
import { HiOutlineArrowTrendingDown, HiOutlineArrowTrendingUp } from "react-icons/hi2";

export default function Account() {
  const { account } = useAccount();

  return (
    <main className="grid min-h-screen grid-cols-1 grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 p-4 bg-teal-200">
      <section className="col-span-1 flex flex-col justify-between bg-teal-700 rounded-3xl p-8">
        <div>
          <h1 className="text-xl text-teal-200 mb-8">Welcome <strong>João</strong>!</h1>
          <p className="text-xl text-teal-200">Your balance is: <br />
            <strong className="text-5xl text-teal-100">{`R$ ${account?.totalValue.toLocaleString('pt-BR')}`}</strong>
          </p>
        </div>
        <div>
          <Link href='/account/deposit' className="w-full bg-yellow-500 font-bold text-white rounded-full mt-4 flex justify-center items-center py-4 lg:py-8 text-2xl cursor-pointer hover:brightness-75">
            Deposit
          </Link>
          <Link href='/account/withdrawn' className="w-full bg-pink-500 font-bold text-white rounded-full mt-4 flex justify-center items-center py-4 lg:py-8 text-2xl cursor-pointer hover:brightness-75">
            Withdraw
          </Link>
        </div>
      </section>
      <section className="mt-8 lg:mt-0 lg:p-8 col-span-2">
        <h2 className="text-xl text-teal-950 mb-8 font-bold">Extract</h2>
        <ul className="w-full">
          {
            account?.movements.length === 0 && (
              <p className="font-bold text-teal-700 text-center text-xl">
                You have no account transactions yet
              </p>
            )
          }
          {
            account?.movements.map(movement => {
              if (movement.movementType === ACCOUNT_MOVEMENT_TYPE.DEPOSIT) {
                return (
                  <li key={movement.id} className="w-full flex items-center gap-4 bg-yellow-200 text-yellow-950 text-xl p-6 rounded-3xl mb-4">
                    <div className="bg-yellow-700 w-12 h-12 rounded-xl flex justify-center items-center text-yellow-200">
                      <HiOutlineArrowTrendingUp size='2rem' />
                    </div>
                    <div className="flex flex-1 justify-between">
                      <p>Depósito</p>
                      <p className="font-bold">{`R$ ${movement?.value.toLocaleString('pt-BR')}`}</p>
                    </div>
                  </li>
                )
              }

              return (
                <li key={movement.id} className="w-full flex items-center gap-4 bg-pink-200 text-pink-950 text-xl p-6 rounded-3xl mb-4">
                  <div className="bg-pink-700 w-12 h-12 rounded-xl flex justify-center items-center text-pink-200">
                    <HiOutlineArrowTrendingDown size='2rem' />
                  </div>
                  <div className="flex flex-1 justify-between">
                    <p>Saque</p>
                    <p className="font-bold">{`- R$ ${movement?.value.toLocaleString('pt-BR')}`}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}
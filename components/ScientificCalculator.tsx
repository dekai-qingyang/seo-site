"use client";

import { useState } from "react";
import { evaluate } from "mathjs";

const buttons = [
  "sin(",
  "cos(",
  "tan(",
  "log(",
  "sqrt(",
  "(",
  ")",
  "%",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "+",
  "^",
];

export default function ScientificCalculator() {

  const [input, setInput] = useState("");

  const [result, setResult] = useState("0");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {

    try {

      const evalResult = evaluate(input);

      setResult(String(evalResult));

    } catch {

      setResult("Error");

    }

  };

  const clearAll = () => {

    setInput("");

    setResult("0");

  };

  return (

    <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-black py-20 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">

            Calculator Online

          </h1>

          <p className="text-slate-300 text-xl leading-8 max-w-3xl mx-auto">

            Free mortgage,
            retirement,
            investment,
            savings,
            loan,
            and financial calculators.

          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">

          <div className="mb-6">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your equation"
              className="
                w-full
                h-16
                rounded-2xl
                border
                border-slate-200
                px-6
                text-2xl
                font-semibold
                outline-none
                focus:border-blue-500
              "
            />

          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-6">

            {buttons.map((btn) => (

              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className="
                  h-16
                  rounded-2xl
                  bg-slate-100
                  hover:bg-blue-600
                  hover:text-white
                  transition
                  text-xl
                  font-bold
                "
              >

                {btn}

              </button>

            ))}

            <button
              onClick={clearAll}
              className="
                h-16
                rounded-2xl
                bg-red-500
                hover:bg-red-600
                text-white
                font-bold
                text-xl
              "
            >

              AC

            </button>

            <button
              onClick={calculate}
              className="
                h-16
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-bold
                text-xl
                col-span-3
                md:col-span-5
              "
            >

              Solve

            </button>

          </div>

          <div className="bg-slate-100 rounded-2xl p-6 min-h-[120px]">

            <p className="text-slate-500 mb-2 text-sm uppercase tracking-widest">

              Result

            </p>

            <h2 className="text-4xl font-black text-slate-900 break-all">

              {result}

            </h2>

          </div>

        </div>

      </div>

    </section>

  );

}
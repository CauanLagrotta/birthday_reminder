import { Header } from "../components/header";

export function About() {
  return (
    <div>
      <Header />

      <div className="bg-[#f2f2f2] min-h-screen flex flex-col items-center text-center px-6">
        <main className="max-w-4xl w-full py-12">
          <h1 className="text-4xl font-bold text-[#51446F] mb-6">
            Sobre o Lembrador de Aniversários
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Você já esqueceu o aniversário de alguém importante? Com o nosso
            Lembrador de Aniversários, isso nunca mais será um problema! Nosso
            sistema permite que você cadastre aniversariantes especiais e, todos
            os dias às 8h da manhã, enviamos um e-mail lembrando quem está
            comemorando mais um ano de vida. Dessa forma, você pode demonstrar
            carinho e atenção sem depender da sua memória.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            O funcionamento é simples e intuitivo: basta criar uma conta,
            cadastrar os aniversários que deseja lembrar e pronto! Nosso sistema
            cuidará do resto. Além disso, sua lista de aniversariantes pode ser
            editada a qualquer momento, garantindo que você sempre tenha as
            informações atualizadas. Chega de correr para comprar presentes ou
            mandar mensagens de última hora!
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            O Lembrador de Aniversários foi desenvolvido pensando na praticidade
            e na importância de fortalecer laços com amigos, familiares e
            colegas de trabalho. Nossa plataforma é segura, rápida e eficiente,
            garantindo que você nunca mais perca uma data especial. Experimente
            agora e transforme a maneira como você se conecta com as pessoas que
            ama!
          </p>
        </main>
      </div>
    </div>
  );
}

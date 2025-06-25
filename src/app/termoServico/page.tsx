// pages/termos-de-servico.js
import Head from 'next/head';

const TermosDeServicoMyPass = () => {
  return (
    <>
      <Head>
        <title>Termos de Serviço - MyPass</title>
      </Head>
      {/* Container principal com estilos para light/dark e alto contraste */}
      <main className="
        font-sans p-5
        bg-gray-50 text-gray-900
        dark:bg-gray-900 dark:text-gray-100
        transition-colors duration-300
        high-contrast:bg-highContrast-bg high-contrast:text-highContrast-text
      ">
        <article className="max-w-4xl mx-auto">
          <h1 className="
            text-3xl md:text-4xl font-bold mb-5 text-center
            text-gray-800 dark:text-gray-100
            high-contrast:text-highContrast-text
          ">
            Termos de Serviço do MyPass
          </h1>
          <p className="
            text-sm md:text-base text-gray-600 mb-4 text-center
            dark:text-gray-400
            high-contrast:text-highContrast-text
          ">
            Última atualização: 24 de junho de 2025
          </p>
          <p className="
            text-base md:text-lg text-gray-700 leading-relaxed
            dark:text-gray-300
            high-contrast:text-highContrast-text
          ">
            Bem-vindo ao <strong>MyPass</strong>!
          </p>
          <p className="
            text-base md:text-lg text-gray-700 leading-relaxed mb-5
            dark:text-gray-300
            high-contrast:text-highContrast-text
          ">
            Estes Termos de Serviço (“Termos”) regem o acesso e uso do site e dos serviços de geração e gerenciamento de senhas fornecidos pelo <strong>MyPass</strong> (“nós”, “nosso” ou “Empresa”). Ao acessar ou utilizar nossa plataforma, você concorda em cumprir estes Termos. Se você não concordar com eles, não utilize nossos serviços.
          </p>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              1. Aceitação dos Termos
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Ao acessar o site do MyPass ou criar uma conta, você concorda em cumprir estes Termos, nossa <a href="/politica-de-privacidade" className="text-blue-600 hover:underline dark:text-blue-400 high-contrast:text-highContrast-primary">Política de Privacidade</a> e quaisquer diretrizes adicionais divulgadas dentro da plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              2. Cadastro e Conta
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Para utilizar as funcionalidades de gerenciamento de senhas do MyPass, você precisará criar uma conta. Você se compromete a fornecer informações verdadeiras, completas e atualizadas durante o cadastro. É sua exclusiva responsabilidade manter a confidencialidade da sua senha mestre e dos dados de login. O MyPass não armazena sua senha mestre em texto puro e não pode recuperá-la para você.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              3. Uso do Serviço (Geração e Gerenciamento de Senhas)
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              O MyPass oferece ferramentas para **gerar senhas fortes e exclusivas** e para **armazená-las de forma segura e criptografada**. Você é o único responsável pelo uso das senhas geradas e pela segurança das senhas que você escolhe armazenar. Não garantimos a infalibilidade de qualquer senha gerada ou a segurança absoluta de seus dados contra todas as ameaças, mas empregamos medidas de segurança robustas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              4. Criptografia e Segurança dos Dados
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              As senhas e outras informações sensíveis que você salva no MyPass são **criptografadas no seu dispositivo antes de serem enviadas para nossos servidores**. Isso significa que suas senhas são armazenadas em um formato ilegível e que o MyPass não tem acesso à sua chave de descriptografia. A segurança de seus dados depende fundamentalmente da força da sua senha mestre e da sua capacidade de mantê-la confidencial.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              5. Direitos de Propriedade Intelectual
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Todo o conteúdo e a tecnologia do MyPass (incluindo marca, logotipo, código-fonte, design, textos, imagens e quaisquer outros materiais) pertencem exclusivamente ao MyPass ou aos seus licenciadores. Nenhuma parte poderá ser copiada, reproduzida, modificada, distribuída ou utilizada de qualquer forma sem autorização prévia por escrito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              6. Conduta do Usuário
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed mb-2
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Ao usar o MyPass, você concorda em não:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>Usar o serviço para fins ilegais ou não autorizados;</li>
              <li>Tentar acessar, invadir, interferir ou comprometer a segurança da plataforma ou de seus sistemas;</li>
              <li>Publicar ou transmitir qualquer conteúdo ofensivo, difamatório, fraudulento, obsceno, ou que infrinja os direitos de propriedade intelectual ou privacidade de terceiros;</li>
              <li>Praticar engenharia reversa, descompilar, desmontar ou de outra forma tentar descobrir o código-fonte do MyPass;</li>
              <li>Usar o serviço de qualquer forma que possa danificar, desabilitar, sobrecarregar ou prejudicar o MyPass ou interferir no uso e aproveitamento de qualquer outra parte do serviço.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              7. Cancelamento e Suspensão de Conta
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Podemos suspender ou encerrar sua conta e acesso ao serviço a qualquer momento, sem aviso prévio ou responsabilidade, se você violar estes Termos. Após o encerramento, seu direito de usar o Serviço cessará imediatamente. Se você deseja encerrar sua conta, basta parar de usar o Serviço ou solicitar a exclusão de sua conta conforme nossa Política de Privacidade.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              8. Limitação de Responsabilidade
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              {`O MyPass é fornecido "no estado em que se encontra" e "conforme disponível", sem garantias de qualquer tipo. O MyPass não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, mas não se limitando a, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis, resultantes de (i) seu acesso ou uso, ou incapacidade de acessar ou usar o Serviço; (ii) qualquer conduta ou conteúdo de terceiros no Serviço; (iii) qualquer conteúdo obtido do Serviço; e (iv) acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo, seja com base em garantia, contrato, ato ilícito (incluindo negligência) ou qualquer outra teoria legal, independentemente de termos sido informados da possibilidade de tais danos.`}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              9. Alterações nos Termos
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Podemos atualizar estes Termos periodicamente. Notificaremos os usuários sobre quaisquer alterações publicando os novos Termos nesta página. Notificaremos você por e-mail e/ou um aviso proeminente em Nosso Serviço, antes que a alteração entre em vigor e atualizaremos a data da `Última atualização` no topo destes Termos de Serviço. O uso contínuo do serviço após a publicação de quaisquer alterações implica sua aceitação dos Termos revisados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              10. Lei Aplicável e Foro
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar seus conflitos de disposições legais. Qualquer disputa, reivindicação ou controvérsia decorrente ou relacionada a estes Termos será submetida aos tribunais competentes da comarca de Mauá, Estado de São Paulo, Brasil.
            </p>
          </section>

          <section>
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              11. Contato
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>Por e-mail: <a href="mailto:evandrogomes542@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400 high-contrast:text-highContrast-primary">evandrogomes542@gmail.com</a></li>
              <li>Por telefone: +55 (11) 98209-815</li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
};

export default TermosDeServicoMyPass;
// pages/politica-de-privacidade.js
import Head from 'next/head';

const PoliticaPrivacidadeMyPass = () => {
  return (
    <>
      <Head>
        <title>Política de Privacidade - MyPass</title>
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
            Política de Privacidade do MyPass
          </h1>
          <p className="
            text-sm md:text-base text-gray-600 mb-4 text-center
            dark:text-gray-400
            high-contrast:text-highContrast-text
          ">
            Última atualização: 24 de junho de 2025
          </p>
          <p className="
            text-base md:text-lg text-gray-700 leading-relaxed mb-5
            dark:text-gray-300
            high-contrast:text-highContrast-text
          ">
            Esta Política de Privacidade descreve como o **MyPass** coleta, usa e protege suas informações ao usar nosso serviço de geração e gerenciamento de senhas. Ela também informa sobre seus direitos de privacidade e como a legislação brasileira o protege. Ao utilizar o Serviço MyPass, você concorda com a coleta e o uso de informações de acordo com esta política.
          </p>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Interpretação e Definições
            </h2>
            <h3 className="
              text-xl font-medium mb-2
              text-gray-700 dark:text-gray-200
              high-contrast:text-highContrast-text
            ">
              Interpretação
            </h3>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              As palavras com a letra inicial maiúscula têm significados definidos sob as seguintes condições. As seguintes definições têm o mesmo significado independentemente de aparecerem no singular ou no plural.
            </p>

            <h3 className="
              text-xl font-medium mb-2 mt-4
              text-gray-700 dark:text-gray-200
              high-contrast:text-highContrast-text
            ">
              Definições
            </h3>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Para os fins desta Política de Privacidade:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li><b>Conta:</b> significa uma conta exclusiva criada para que você acesse as funcionalidades de gerenciamento de senhas do nosso Serviço.</li>
              <li><b>Afiliada:</b> significa uma entidade que controla, é controlada por ou está sob controle comum com uma parte, onde `controle` significa a propriedade de 50% ou mais das ações, participação societária ou outros títulos com direito a voto na eleição de diretores ou outra autoridade administrativa.</li>
              <li><b>Empresa:</b> (referida como `o MyPass`, `nós`, `nos` ou `nosso`) refere-se ao serviço MyPass.</li>
              <li><b>Cookies:</b> são pequenos arquivos colocados no seu dispositivo por um site, contendo detalhes do seu histórico de navegação.</li>
              <li><b>País:</b> refere-se ao Brasil.</li>
              <li><b>Dispositivo:</b> significa qualquer dispositivo que possa acessar o Serviço, como um computador, celular ou tablet digital.</li>
              <li><b>Dados Pessoais:</b> são quaisquer informações relacionadas a uma pessoa identificada ou identificável, como e-mail, nome, e dados de conta. **Importante: Suas senhas geradas e salvas no MyPass são criptografadas e tratadas com o mais alto nível de segurança. Elas não são acessíveis por nós em sua forma original.**</li>
              <li><b>Serviço:</b> refere-se à plataforma MyPass, que inclui o gerador de senhas e o gerenciador de senhas.</li>
              <li><b>Provedor de Serviço:</b> significa qualquer pessoa física ou jurídica que processe os dados em nome da Empresa.</li>
              <li><b>Serviço de Mídia Social de Terceiros:</b> refere-se a qualquer site ou rede social por meio da qual um usuário possa fazer login ou criar uma conta para usar o Serviço (ex: Google).</li>
              <li><b>Dados de Uso:</b> são dados coletados automaticamente, gerados pelo uso do Serviço ou da própria infraestrutura do Serviço.</li>
              <li><b>Website:</b> refere-se ao MyPass, acessível em <a href="https://mypass.vercel.app/" className="text-blue-600 hover:underline dark:text-blue-400 high-contrast:text-highContrast-primary">https://mypass.vercel.app/</a></li>
              <li><b>Você:</b> significa o indivíduo acessando ou usando o Serviço, ou a empresa, ou outra entidade legal em nome da qual tal indivíduo está acessando ou usando o Serviço, conforme aplicável.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Coleta e Uso de Seus Dados Pessoais
            </h2>
            <h3 className="
              text-xl font-medium mb-2
              text-gray-700 dark:text-gray-200
              high-contrast:text-highContrast-text
            ">
              Tipos de Dados Coletados
            </h3>

            <h4 className="
              text-lg font-medium mb-1 mt-3
              text-gray-700 dark:text-gray-200
              high-contrast:text-highContrast-text
            ">
              Dados Pessoais
            </h4>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Ao usar nosso Serviço, podemos pedir que você nos forneça certas informações pessoalmente identificáveis para criar e gerenciar sua conta, como:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>Endereço de e-mail</li>
              <li>Nome e sobrenome (se fornecidos)</li>
              <li>Dados de Uso</li>
              <li>**Informações de Senhas Salvas:** Senhas que você opta por salvar em nosso gerenciador são armazenadas de forma **criptografada e segura**. O MyPass não tem acesso às suas senhas em texto puro.</li>
            </ul>

            <h4 className="
              text-lg font-medium mb-1 mt-3
              text-gray-700 dark:text-gray-200
              high-contrast:text-highContrast-text
            ">
              Dados de Uso
            </h4>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Coletamos automaticamente informações sobre como o Serviço é acessado e utilizado:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>Endereço IP</li>
              <li>Tipo e versão do navegador</li>
              <li>Páginas visitadas</li>
              <li>Data e hora da visita</li>
              <li>Tempo gasto nas páginas</li>
              <li>Identificadores de dispositivo</li>
            </ul>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Acesso via dispositivo móvel pode incluir:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>Tipo de dispositivo móvel</li>
              <li>ID exclusivo do dispositivo</li>
              <li>Sistema operacional</li>
              <li>Tipo de navegador de internet móvel</li>
            </ul>

            <h4 className="
              text-lg font-medium mb-1 mt-3
              text-gray-700 dark:text-gray-200
              high-contrast:text-highContrast-text
            ">
              Informações de Serviços de Mídia Social de Terceiros
            </h4>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Se você optar por se registrar ou fazer login usando serviços de terceiros (ex: Google), poderemos coletar certas informações do seu perfil de mídia social, de acordo com as permissões que você nos concede:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>Nome</li>
              <li>Endereço de e-mail</li>
              <li>Foto de perfil (se disponível)</li>
            </ul>

            <h4 className="
              text-lg font-medium mb-1 mt-3
              text-gray-700 dark:text-gray-200
              high-contrast:text-highContrast-text
            ">
              Tecnologias de Rastreamento e Cookies
            </h4>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Utilizamos Cookies e tecnologias semelhantes para rastrear a atividade em nosso Serviço e armazenar certas informações. Isso nos ajuda a entender como você usa o MyPass, melhorar sua experiência e para fins de segurança.
            </p>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Tipos de Cookies usados:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li><b>Cookies Essenciais (Necessários):</b> São cruciais para o funcionamento básico do Website e para que você possa usar as funcionalidades de login e gerenciamento de senhas. Sem esses Cookies, o Serviço não funcionaria corretamente.</li>
              <li><b>Cookies de Preferência (Funcionalidade):</b> Esses Cookies nos permitem lembrar suas preferências (como idioma ou tema) e configurações para proporcionar uma experiência mais personalizada.</li>
              <li><b>Cookies de Análise/Desempenho:</b> Coletam informações sobre como os usuários interagem com o MyPass (por exemplo, quais páginas são mais visitadas, se ocorrem erros). Esses dados são agregados e anônimos e nos ajudam a melhorar o desempenho e a usabilidade do Serviço.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Uso de Seus Dados Pessoais
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Utilizamos os Dados Pessoais coletados para os seguintes propósitos:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>**Para Fornecer e Manter o Serviço:** Incluindo o acesso ao gerador de senhas, funcionalidades de login e o gerenciamento seguro das suas senhas salvas.</li>
              <li>**Para Gerenciar Sua Conta:** Para registrar e autenticar você como usuário do MyPass.</li>
              <li>**Para Cumprir Contratos:** O cumprimento de qualquer contrato que você tenha conosco através do Serviço.</li>
              <li>**Para Entrar em Contato com Você:** Para comunicações importantes relacionadas ao serviço, atualizações, alertas de segurança e suporte.</li>
              <li>**Para Fornecer Notícias e Ofertas:** Se você consentiu em recebê-las, podemos enviar informações sobre novos recursos ou serviços do MyPass.</li>
              <li>**Para Gerenciar Suas Solicitações:** Para atender e gerenciar suas solicitações e feedbacks para nós.</li>
              <li>**Para Transferências Comerciais:** Se houver uma fusão, aquisição ou venda de ativos, seus Dados Pessoais podem ser transferidos. Notificaremos você antes que isso ocorra.</li>
              <li>**Para Análise e Melhoria do Serviço:** Para entender como o MyPass é usado, identificar tendências, depurar problemas e aprimorar nossas funcionalidades e segurança.</li>
              <li>**Para Segurança e Prevenção de Fraudes:** Para proteger a integridade do MyPass e a segurança dos dados de nossos usuários.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Compartilhamento de Seus Dados
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Podemos compartilhar suas informações pessoais nas seguintes situações:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>**Com Provedores de Serviço:** Podemos compartilhar seus Dados Pessoais com prestadores de serviços terceirizados para monitorar e analisar o uso do nosso Serviço, bem como para fins de processamento de dados (ex: hospedagem do site).</li>
              <li>**Com Afiliadas:** Podemos compartilhar suas informações com nossas afiliadas, caso existam, exigindo que elas cumpram esta Política de Privacidade.</li>
              <li>**Com Parceiros Comerciais:** Podemos compartilhar suas informações com nossos parceiros comerciais para oferecer a você determinados produtos, serviços ou promoções.</li>
              <li>**Com Outros Usuários:** Quando você interage publicamente em áreas do Serviço (se aplicável), certas informações podem ser visíveis a outros usuários.</li>
              <li>**Com Seu Consentimento:** Podemos divulgar suas informações pessoais para qualquer outro propósito com seu consentimento.</li>
              <li>**Para Transações Comerciais:** Em caso de fusão, venda de ativos, financiamento ou aquisição de nosso negócio, seus Dados Pessoais podem ser transferidos como parte dos ativos.</li>
              <li>**Conformidade Legal e Segurança:** Podemos divulgar seus Dados Pessoais para cumprir uma obrigação legal, proteger e defender os direitos ou propriedades do MyPass, prevenir ou investigar possíveis irregularidades relacionadas ao Serviço, proteger a segurança pessoal dos usuários do Serviço ou do público, ou proteger-se contra responsabilidade legal.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Retenção de Seus Dados Pessoais
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Reteremos seus Dados Pessoais apenas pelo tempo necessário para os propósitos estabelecidos nesta Política de Privacidade. Isso inclui o tempo necessário para cumprir nossas obrigações legais (por exemplo, se formos obrigados a reter seus dados para cumprir as leis aplicáveis), resolver disputas e fazer cumprir nossos acordos e políticas.
            </p>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Também poderemos reter Dados de Uso para fins de análise interna. Os Dados de Uso são geralmente retidos por um período mais curto, a menos que esses dados sejam usados para fortalecer a segurança ou para melhorar a funcionalidade de Nosso Serviço, ou sejamos legalmente obrigados a reter esses dados por períodos mais longos.
            </p>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              **Suas senhas criptografadas serão mantidas enquanto sua conta estiver ativa, a menos que você as exclua manualmente.**
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Transferência de Seus Dados Pessoais
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Suas informações, incluindo Dados Pessoais, podem ser processadas e armazenadas em servidores localizados fora do seu estado, província, país ou outra jurisdição governamental onde as leis de proteção de dados podem ser diferentes das de sua jurisdição.
            </p>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Ao concordar com esta Política de Privacidade e enviar essas informações, você concorda com essa transferência. O MyPass tomará todas as medidas razoavelmente necessárias para garantir que seus dados sejam tratados com segurança e de acordo com esta Política de Privacidade e nenhuma transferência de seus Dados Pessoais ocorrerá para uma organização ou um país, a menos que haja controles adequados em vigor, incluindo a segurança de seus dados e outras informações pessoais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Exclusão de Seus Dados Pessoais
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Você tem o direito de excluir ou solicitar que o MyPass auxilie na exclusão dos Dados Pessoais que coletamos sobre você. Nosso Serviço pode fornecer a capacidade de excluir certas informações sobre você de dentro do Serviço. Você pode atualizar, alterar ou excluir suas informações a qualquer momento, fazendo login em sua Conta, se tiver uma, e visitando a seção de configurações de privacidade que permite gerenciar seus dados pessoais.
            </p>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Você também pode entrar em contato conosco para solicitar acesso, correção ou exclusão de quaisquer informações pessoais que você nos forneceu. Tenha em mente que podemos precisar reter certas informações quando tivermos uma obrigação legal ou base legítima para fazê-lo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Segurança dos Seus Dados Pessoais
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              A segurança de seus Dados Pessoais é muito importante para nós. Empregamos medidas de segurança comercialmente razoáveis para proteger seus Dados Pessoais contra acesso não autorizado, divulgação, alteração ou destruição. No entanto, lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus Dados Pessoais, não podemos garantir sua segurança absoluta.
            </p>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              **As senhas que você salva no MyPass são criptografadas antes do armazenamento, o que significa que nem mesmo o MyPass pode acessá-las em sua forma original. A segurança das suas senhas depende significativamente da segurança da sua senha mestre ou das credenciais da sua conta no MyPass.**
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Privacidade das Crianças
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Nosso Serviço não se destina a menores de 13 anos. Não coletamos intencionalmente informações de identificação pessoal de qualquer pessoa com menos de 13 anos. Se você é pai/mãe ou responsável e sabe que seu filho nos forneceu Dados Pessoais, entre em contato conosco. Se tomarmos conhecimento de que coletamos Dados Pessoais de qualquer pessoa com menos de 13 anos sem verificação do consentimento dos pais, tomaremos medidas para remover essas informações de nossos servidores.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Links para Outros Sites
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Nosso Serviço pode conter links para outros sites que não são operados por nós. Se você clicar em um link de terceiros, será direcionado para o site desse terceiro. Aconselhamos vivamente que você revise a Política de Privacidade de cada site que visitar. Não temos controle e não assumimos nenhuma responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Alterações a Esta Política de Privacidade
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Notificaremos você por e-mail e/ou um aviso proeminente em Nosso Serviço, antes que a alteração entre em vigor e atualizaremos a data da `Última atualização` no topo desta Política de Privacidade.
            </p>
            <p className="
              text-base text-gray-700 leading-relaxed mt-3
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Recomendamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações. As alterações a esta Política de Privacidade são eficazes quando são publicadas nesta página.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Exclusão dos Dados
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Você pode solicitar a exclusão total dos seus dados pessoais e de todas as senhas salvas em sua conta a qualquer momento, entrando em contato conosco pelo e-mail <a href="mailto:evandrogomes542@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400 high-contrast:text-highContrast-primary">evandrogomes542@gmail.com</a>. Após a verificação da identidade para sua segurança, seus dados serão removidos permanentemente de nossos sistemas em até 7 dias úteis.
            </p>
          </section>

          <section>
            <h2 className="
              text-2xl font-semibold mb-3
              text-gray-800 dark:text-gray-100
              high-contrast:text-highContrast-text
            ">
              Contato
            </h2>
            <p className="
              text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:
            </p>
            <ul className="
              list-disc pl-5 text-base text-gray-700 leading-relaxed
              dark:text-gray-300
              high-contrast:text-highContrast-text
            ">
              <li>Por e-mail: <a href="mailto:evandrogomes542@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400 high-contrast:text-highContrast-primary">evandrogomes542@gmail.com</a></li>
              <li>Por telefone: +55 (11) 98209-815 (Observação: este número pode ser para contato geral, não necessariamente para suporte técnico direto de privacidade, a menos que especificado.)</li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
};

export default PoliticaPrivacidadeMyPass;
import type { ContentSection } from "./materials";

export interface LocalizedMaterial {
  title?: string;
  description?: string;
  categoryLabel?: string;
  downloadTitle?: string;
  downloadDescription?: string;
  content?: ContentSection[];
}

// Переводы для не-английских языков. Английский берётся из materials.ts.
// Если поля/контент нет — используется английский фолбэк.
export const translations: Record<string, Record<string, LocalizedMaterial>> = {
  pt: {
    "semen-storage-handling": {
      title: "Armazenamento e Manuseio de Sêmen: 10 Passos Críticos",
      description:
        "Erros de temperatura durante o descongelamento custam mais do que qualquer falha de equipamento. Veja o que realmente importa.",
      categoryLabel: "Guia",
      downloadTitle: "Baixar: Checklist de Armazenamento e Manuseio de Sêmen",
      downloadDescription:
        "Informe seu e-mail para baixar este checklist e ter acesso gratuito a novos conteúdos com a inscrição.",
      // corpo do artigo: tradução PT na etapa 2
    },
    "semen-quality-analysis": {
      title:
        "Confira o Avare App você mesmo: um protocolo de QA de campo vs CASA e contagem manual",
      description:
        "Este protocolo confirma que o Avare App lê motilidade e concentração com a mesma precisão que o CASA e a contagem manual — e funciona onde nenhum sistema de laboratório está ao alcance.",
      categoryLabel: "Protocolo",
      downloadTitle: "Baixar: Protocolo de QA do Avare App",
      downloadDescription:
        "Informe seu e-mail para baixar este protocolo e ter acesso gratuito a novos conteúdos com a inscrição.",
      content: [
        {
          heading: "Um número errado não parece errado",
          paragraph:
            "Toda inseminação começa com três números: motilidade total, motilidade progressiva, concentração. Esses números decidem se uma palheta vai para a vaca ou para o lixo. Decidem se um touro permanece no catálogo. Decidem como uma dose é dividida. E aqui está a parte incômoda — quando um desses números está errado, nada na sua tela avisa. Uma leitura de motilidade 20% alta demais é idêntica a uma leitura de motilidade correta. Você não descobre no microscópio. Você descobre 35 dias depois, como um útero vazio no ultrassom, e então tudo é atribuído a um ciclo ruim, estresse ou ao clima.",
        },
        {
          paragraph:
            "Você se esforça enormemente para manusear o sêmen corretamente — puxando três palhetas por vez, mantendo o banho de descongelamento na faixa certa, usando a dose em poucos minutos. E então entrega o julgamento final a um método de medição e presume que ele está certo. Vale a pena verificar essa premissa. É exatamente para isso que serve um protocolo de QA: confirmar que o Avare App coloca um número confiável por trás de cada inseminação — especialmente onde nenhum sistema de laboratório está ao alcance.",
        },
        {
          heading: "O Avare App funciona onde o CASA não chega",
          paragraph:
            "O Avare App (tecnologia MAKSA) coloca a análise de sêmen no seu smartphone: motilidade total, motilidade progressiva e concentração — ao lado de cada inseminador, no campo, sem depender de uma bancada de laboratório. Isto não é uma tentativa de substituir o CASA. O CASA é uma excelente referência onde existe: preciso, repetível, um merecido padrão-ouro. Mas é caro, fixo no laboratório e fisicamente ausente na maioria das estações de campo e fazendas. É exatamente essa lacuna que o Avare App preenche — uma leitura confiável no ponto onde a inseminação realmente acontece e onde não há CASA.",
        },
        {
          paragraph:
            "Em estudos, o MAKSA tem correlação com sistemas CASA de r > 0,90 — ou seja, os resultados são estatisticamente equivalentes para uso em campo. O protocolo de QA permite que você comprove isso nas suas próprias amostras: cruze as leituras do Avare App com referências reconhecidas e confirme que os números batem nas suas condições. Há duas referências:",
        },
        {
          items: [
            "CASA — uma referência precisa e repetível onde o sistema está disponível no local. O segundo par de olhos ideal para a verificação cruzada.",
            "Contagem manual — uma referência disponível em quase todo lugar. Mas ela é tão estável quanto a mão e o olho por trás dela: uma auditoria interna em uma central de IA encontrou uma diferença de 18 pontos na concepção entre três técnicos manuseando sêmen idêntico do mesmo touro no mesmo dia. Se a técnica varia tanto no piso, ela varia também na câmara de contagem.",
          ],
        },
        {
          paragraph:
            "O objetivo do protocolo é tornar sua análise de sêmen mais precisa e mais confiável. Você compara as leituras do Avare App com outros sistemas na mesma amostra, no mesmo dia, nas suas condições, e confirma que os números concordam. Concordância confirmada significa uma coisa: o resultado do app é confiável, e a qualidade da sua análise se mantém estável de palheta em palheta.",
        },
        {
          heading: "Como o protocolo funciona: uma amostra, verificada de forma cruzada",
          paragraph:
            "Você pega 3–5 palhetas congeladas-descongeladas de animais diferentes. Para cada palheta você faz uma leitura no Avare App e depois passa a mesma amostra pelas referências — CASA (se disponível no local) e uma contagem manual ao microscópio. Você registra motilidade total, motilidade progressiva e concentração para cada método, lado a lado, e vê o quanto as leituras do app se distanciam das referências.",
        },
        {
          paragraph:
            "Essa é toda a lógica. A disciplina está na execução: descongele a palheta corretamente (37 °C, 30–45 segundos), pré-aqueça a lâmina a 37–38 °C e — isto importa mais do que se imagina — combine o volume carregado com o tamanho da sua lamínula. Amostra de mais ou de menos sob o vidro muda a profundidade do campo, e uma profundidade errada enviesa silenciosamente a concentração e a motilidade de todos os métodos ao mesmo tempo. O protocolo completo inclui a tabela de volume por lamínula, a planilha de registro e o passo a passo para que a comparação seja justa.",
        },
        {
          heading: "O número que diz se você pode confiar no número",
          paragraph:
            "É aqui que o protocolo de validação deixa de ser uma sugestão e se torna um padrão. O critério de aceitação é simples:",
        },
        {
          items: [
            "Diferença de ±10–15% entre o Avare App e as referências = aceitável. O app concorda com o CASA e com a contagem manual. Confie no número.",
            "Desvio acima de 15% = investigue. Anexe foto ou vídeo como evidência e repita com uma lâmina nova.",
          ],
        },
        {
          paragraph:
            "Uma diferença acima de 15% não é erro de arredondamento — é o método avisando que algo está errado: volume carregado, temperatura da lâmina, uma bolha de ar ou uma discrepância real que vale investigar antes de chegar à vaca. A maioria das reclamações de que 'o app e o CASA divergem' desaparece no momento em que o volume é ajustado ao tamanho da lamínula e a lâmina é aquecida corretamente. O limite transforma uma preocupação vaga em um aprovado/reprovado claro que você pode colocar em um relatório.",
        },
        {
          heading: "Você não precisa desperdiçar a palheta",
          paragraph:
            "A objeção mais comum à validação é que ela gasta estoque. Não gasta. Retirar 10 µL de uma palheta de 0,25–0,5 mL não impede a inseminação se for feito imediatamente. A melhor prática nas centrais de IA é tirar uma única gota da palheta para a análise no Avare e inseminar os ~90% restantes na hora. Você valida seu método e cobre a vaca com a mesma palheta. Não há nenhum trade-off a administrar.",
        },
        {
          heading: "Por que um erro de 15% não é um problema de 15%",
          paragraph:
            "Um erro de medição não fica dentro da planilha. Ele entra direto na sua taxa de concepção. Rejeite um bom lote por uma leitura de motilidade falsamente baixa e você descartou genética já paga. Aprove um lote fraco por uma leitura falsamente alta e você inseminou vacas que voltarão vazias. O custo é o mesmo que atravessa todos os artigos deste site: uma vaca que não emprenha no primeiro serviço custa cerca de US$ 622 em tratamento repetido, manejo e um intervalo entre partos esticado, e vacas que precisam de três ou mais serviços custam mais de US$ 205 por cabeça por ano. Em um rebanho de 500 vacas, a diferença entre uma taxa de concepção de 44% e 56% são 60 vacas vazias. Uma medição em que você não pode confiar não é mais barata que uma boa — é o instrumento mais caro da estação, porque cobra a conta 35 dias depois do erro, com juros.",
        },
        {
          heading: "O que isso significa na prática",
          paragraph:
            "Validar seu método de análise não é um exercício de pesquisa — é um controle de produção, do mesmo jeito que pré-resfriar a pinça e cronometrar o descongelamento são controles de produção. Rode o protocolo de QA no início de cada estação, após qualquer mudança de equipamento ou software, e sempre que um método der um resultado que você não esperaria daquele touro. Três a cinco palhetas e uma tarde compram uma temporada de números nos quais você pode realmente agir. Todo o resto que você faz — manuseio, armazenamento, cálculo de dose — pressupõe que a análise está certa. É assim que você para de presumir e passa a saber.",
        },
        {
          heading: "Baixe o protocolo",
          paragraph:
            "Baixe o PDF completo do Protocolo de QA do Avare App — o passo a passo completo, a tabela de volume por lamínula, a planilha de registro de exemplo e os limites de validação de ±15%. Coloque o Avare App à prova contra o CASA e a contagem manual nesta temporada, confirme você mesmo e ponha um número confiável por trás de cada inseminação.",
        },
      ],
    },
  },
  es: {
    "semen-storage-handling": {
      title: "Almacenamiento y Manejo de Semen: 10 Pasos Críticos",
      description:
        "Los errores de temperatura durante la descongelación cuestan más que cualquier falla de equipo. Esto es lo que realmente importa.",
      categoryLabel: "Guía",
      downloadTitle: "Descargar: Lista de Almacenamiento y Manejo de Semen",
      downloadDescription:
        "Ingresa tu correo para descargar esta lista y obtener acceso gratuito a nuevo contenido con la suscripción.",
      // cuerpo del artículo: traducción ES en la etapa 2
    },
    "semen-quality-analysis": {
      title:
        "Compruebe el Avare App usted mismo: un protocolo de QA de campo vs CASA y conteo manual",
      description:
        "Este protocolo confirma que el Avare App lee la motilidad y la concentración con la misma precisión que CASA y el conteo manual — y funciona donde ningún sistema de laboratorio está al alcance.",
      categoryLabel: "Protocolo",
      downloadTitle: "Descargar: Protocolo de QA del Avare App",
      downloadDescription:
        "Ingresa tu correo para descargar este protocolo y obtener acceso gratuito a nuevo contenido con la suscripción.",
      content: [
        {
          heading: "Un número equivocado no parece equivocado",
          paragraph:
            "Toda inseminación empieza con tres números: motilidad total, motilidad progresiva, concentración. Esos números deciden si una pajilla va a una vaca o a la basura. Deciden si un toro permanece en el catálogo. Deciden cómo se divide una dosis. Y aquí está la parte incómoda — cuando uno de esos números está mal, nada en tu pantalla te lo avisa. Una lectura de motilidad un 20% demasiado alta se ve idéntica a una lectura de motilidad correcta. No te enteras en el microscopio. Te enteras 35 días después, como un útero vacío en la ecografía, y para entonces se atribuye a un mal ciclo, al estrés o al clima.",
        },
        {
          paragraph:
            "Pones un enorme esfuerzo en manejar el semen correctamente — sacando tres pajillas a la vez, manteniendo el baño de descongelación en rango, usando la dosis en pocos minutos. Y luego le entregas el juicio final a un método de medición y das por sentado que es correcto. Vale la pena comprobar esa suposición. Para eso sirve exactamente un protocolo de QA: confirmar que el Avare App pone un número confiable detrás de cada inseminación — sobre todo donde ningún sistema de laboratorio está al alcance.",
        },
        {
          heading: "El Avare App funciona donde CASA no llega",
          paragraph:
            "El Avare App (tecnología MAKSA) pone el análisis de semen en tu smartphone: motilidad total, motilidad progresiva y concentración — junto a cada inseminador, en el campo, sin atadura a una mesa de laboratorio. Esto no es un intento de reemplazar a CASA. CASA es una excelente referencia donde existe: precisa, repetible, un merecido patrón de oro. Pero es cara, fija en el laboratorio y físicamente ausente en la mayoría de las estaciones de campo y granjas. Es justamente esa brecha la que llena el Avare App — una lectura confiable en el punto donde la inseminación realmente ocurre y donde no hay CASA.",
        },
        {
          paragraph:
            "En estudios, MAKSA correlaciona con sistemas CASA en r > 0,90 — es decir, los resultados son estadísticamente equivalentes para uso en campo. El protocolo de QA te permite comprobarlo en tus propias muestras: contrasta las lecturas del Avare App con referencias reconocidas y confirma que los números coinciden en tus condiciones. Hay dos referencias:",
        },
        {
          items: [
            "CASA — una referencia precisa y repetible donde el sistema está disponible en el sitio. El segundo par de ojos ideal para el contraste.",
            "Conteo manual — una referencia disponible casi en todas partes. Pero es tan estable como la mano y el ojo detrás de ella: una auditoría interna en un centro de IA encontró una diferencia de 18 puntos en la concepción entre tres técnicos manejando semen idéntico del mismo toro el mismo día. Si la técnica varía tanto en el piso, también varía en la cámara de conteo.",
          ],
        },
        {
          paragraph:
            "El objetivo del protocolo es hacer tu análisis de semen más preciso y más confiable. Comparas las lecturas del Avare App con otros sistemas en la misma muestra, el mismo día, en tus condiciones, y confirmas que los números concuerdan. La concordancia confirmada significa una cosa: el resultado de la app es confiable, y la calidad de tu análisis se mantiene estable de pajilla en pajilla.",
        },
        {
          heading: "Cómo funciona el protocolo: una muestra, contrastada",
          paragraph:
            "Tomas 3–5 pajillas congeladas-descongeladas de animales distintos. Para cada pajilla haces una lectura en el Avare App y luego pasas la misma muestra por las referencias — CASA (si está disponible en el sitio) y un conteo manual al microscopio. Registras motilidad total, motilidad progresiva y concentración para cada método, lado a lado, y ves cuánto se alejan las lecturas de la app de las referencias.",
        },
        {
          paragraph:
            "Esa es toda la lógica. La disciplina está en la ejecución: descongela la pajilla correctamente (37 °C, 30–45 segundos), precalienta el portaobjetos a 37–38 °C y — esto importa más de lo que la gente espera — ajusta el volumen cargado al tamaño de tu cubreobjetos. Muestra de más o de menos bajo el vidrio cambia la profundidad del campo, y una profundidad equivocada sesga en silencio la concentración y la motilidad de todos los métodos a la vez. El protocolo completo incluye la tabla de volumen por cubreobjetos, la hoja de registro y el paso a paso para que la comparación sea justa.",
        },
        {
          heading: "El número que te dice si puedes confiar en el número",
          paragraph:
            "Aquí es donde el protocolo de validación deja de ser una sugerencia y se vuelve un estándar. El criterio de aceptación es simple:",
        },
        {
          items: [
            "Diferencia de ±10–15% entre el Avare App y las referencias = aceptable. La app concuerda con CASA y con el conteo manual. Confía en el número.",
            "Desviación mayor al 15% = investiga. Adjunta foto o video como evidencia y repite con un portaobjetos nuevo.",
          ],
        },
        {
          paragraph:
            "Una diferencia por encima del 15% no es un error de redondeo — es el método avisándote de que algo anda mal: volumen cargado, temperatura del portaobjetos, una burbuja de aire o una discrepancia real que conviene perseguir antes de que llegue a una vaca. La mayoría de las quejas de que 'la app y CASA no coinciden' desaparecen en cuanto el volumen se ajusta al tamaño del cubreobjetos y el portaobjetos se calienta bien. El umbral convierte una preocupación vaga en un aprobado/reprobado claro que puedes poner en un informe.",
        },
        {
          heading: "No tienes que desperdiciar la pajilla",
          paragraph:
            "La objeción más común a la validación es que consume inventario. No lo hace. Sacar 10 µL de una pajilla de 0,25–0,5 mL no impide la inseminación si se hace de inmediato. La mejor práctica en los centros de IA es tomar una sola gota de la pajilla para el análisis en el Avare e inseminar el ~90% restante en el acto. Validas tu método e inseminas a la vaca con la misma pajilla. No hay ningún compromiso que gestionar.",
        },
        {
          heading: "Por qué un error del 15% no es un problema del 15%",
          paragraph:
            "Un error de medición no se queda dentro de la planilla. Entra directo en tu tasa de concepción. Rechaza un buen lote por una lectura de motilidad falsamente baja y habrás descartado genética ya pagada. Aprueba un lote débil por una lectura falsamente alta y habrás inseminado vacas que volverán vacías. El costo es el mismo que recorre todos los artículos de este sitio: una vaca que no concibe al primer servicio cuesta unos US$ 622 en tratamiento repetido, manejo y un intervalo entre partos alargado, y las vacas que necesitan tres o más servicios cuestan más de US$ 205 por cabeza al año. En un hato de 500 vacas, la diferencia entre una tasa de concepción del 44% y del 56% son 60 vacas vacías. Una medición en la que no puedes confiar no es más barata que una buena — es el instrumento más caro de la estación, porque te pasa la cuenta 35 días después del error, con intereses.",
        },
        {
          heading: "Qué significa esto en la práctica",
          paragraph:
            "Validar tu método de análisis no es un ejercicio de investigación — es un control de producción, igual que preenfriar la pinza y cronometrar la descongelación son controles de producción. Corre el protocolo de QA al inicio de cada temporada, después de cualquier cambio de equipo o software, y cada vez que un método dé un resultado que no esperarías de ese toro. Tres a cinco pajillas y una tarde te compran una temporada de números sobre los que realmente puedes actuar. Todo lo demás que haces — manejo, almacenamiento, cálculo de dosis — supone que el análisis es correcto. Así es como dejas de suponer y empiezas a saber.",
        },
        {
          heading: "Descarga el protocolo",
          paragraph:
            "Descarga el PDF completo del Protocolo de QA del Avare App — el paso a paso completo, la tabla de volumen por cubreobjetos, la hoja de registro de ejemplo y los umbrales de validación de ±15%. Pon el Avare App a prueba contra CASA y el conteo manual esta temporada, compruébalo tú mismo y pon un número confiable detrás de cada inseminación.",
        },
      ],
    },
  },
};

// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");
const fs = require("fs");

venom
  .create({
    session: "sua-marca-digital", //name of session
  })
  .then((client) => sendMessages(client))
  .catch((err) => {
    console.log(err);
  });

const sendMessages = async (client) => {
  try {
    const phoneNumbers = JSON.parse(fs.readFileSync("./prodNumbers.json"));
    const sentNumbers = JSON.parse(fs.readFileSync("./sentNumbers.json"));
    for (const phoneNumber of phoneNumbers) {
      await client
        .sendText(
          `${phoneNumber.phoneUnformatted}@c.us`,
          `Olá ${phoneNumber.title}! Tudo certo?\n\nMe chamo Giovanne Marrone, sou Desenvolvedor Web e notei que a sua barbearia ainda não possui um site próprio para apresentar da forma mais profissional possível o seu trabalho.\n\nSabemos que hoje em dia, presença onlina conta muito para um negócio e um perfil nas redes sociais não é o bastante para atingir o máximo de pessoas possíveis com credibilidade na internet, e é aí que eu entro para ajudar você!\n\nO que acha de ficar à frente da concorrência e ter o site da sua barbearia, com o seu domínio, moderno, funcional e otimizado? Tudo isso por um preço acessível e justo!\n\nCaso tenha interesse em saber mais, pode me responder por aqui mesmo que podemos conversar sobre como você poderá alcançar novos clientes através de um site!`
        )
        .then((result) => {
          console.log("Result: ", result); //return object success
          console.log("Mensagem enviada para: ", phoneNumber.title);
        })
        .catch((err) => {
          console.error("Error when sending: ", err); //return object error
        });

      sentNumbers.push(phoneNumber);
      fs.writeFileSync("sentNumbers.json", JSON.stringify(sentNumbers));
    }
  } catch (error) {
    console.error(`Error sending messages: ${error}`);
  }
};

// const sendMenuMessages = async (client) => {
//   try {
//     const phoneNumbers = JSON.parse(fs.readFileSync("./testNumbers.json"));
//     const sentNumbers = JSON.parse(fs.readFileSync("./sentNumbers.json"));

//     let sections = [
//       {
//         title: "Section 1",
//         rows: [
//           {
//             rowId: "1",
//             title: "Element 1",
//             description: "Description 1",
//           },
//           {
//             rowId: "2",
//             title: "Element 2",
//             description: "Description 2",
//           },
//         ],
//       },
//       {
//         title: "Section 2",
//         rows: [
//           {
//             rowId: "3",
//             title: "Element 3",
//             description: "Description 3",
//           },
//           {
//             rowId: "4",
//             title: "Element 4",
//             description: "Description 4",
//           },
//         ],
//       },
//     ];

//     for (const phoneNumber of phoneNumbers) {
//       const alreadySentNumber = sentNumbers.find(
//         (n) => n.phone === phoneNumber.phone
//       );

//       if (!alreadySentNumber) {
//         await client
//           .sendListMenu(
//             `${phoneNumber.phone}@c.us`,
//             "Title",
//             "Description",
//             "Choose",
//             sections
//           )
//           .then((result) => {
//             console.log("Result: ", result); //return object success
//           })
//           .catch((erro) => {
//             console.error("Error when sending: ", erro); //return object error
//           });

//         sentNumbers.push(phoneNumber);
//         fs.writeFileSync("sentNumbers.json", JSON.stringify(sentNumbers));
//       }
//     }
//   } catch (error) {
//     console.error(`Error sending messages: ${error}`);
//   }
// };

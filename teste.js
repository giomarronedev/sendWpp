const fs = require('fs');

function removeObjectsWithoutPhone(filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    let json = JSON.parse(data);
    let filteredJson = json.filter(obj => obj.hasOwnProperty("phone"));

    fs.writeFile(filePath, JSON.stringify(filteredJson), (err) => {
      if (err) throw err;
      console.log("Arquivo atualizado com sucesso!");
    });
  });
}

removeObjectsWithoutPhone('./phoneNumbers.json');

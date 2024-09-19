const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Ruta GET para mostrar los usuarios
app.get('/users', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error leyendo el archivo JSON');
      return;
    }
    const users = JSON.parse(data).users;
    res.json(users);
  });
});

// Ruta POST para agregar un nuevo usuario
app.post('/users', (req, res) => {
  const newUser = req.body;

  // Leer el archivo JSON
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error leyendo el archivo JSON');
      return;
    }

    // Convertir el archivo JSON a un objeto
    const parsedData = JSON.parse(data);
    
    // Agregar el nuevo usuario a la lista
    newUser.id = parsedData.users.length + 1; // Generar un nuevo ID simple
    parsedData.users.push(newUser);

    // Escribir los cambios de vuelta al archivo JSON
    fs.writeFile('data.json', JSON.stringify(parsedData, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error escribiendo en el archivo JSON');
        return;
      }

      // Responder con el nuevo usuario agregado
      res.status(201).json(newUser);
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

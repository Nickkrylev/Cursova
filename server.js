const express = require('express');
const path = require('path');
const db_connection = require('./db_conect.js');
const session = require('express-session');
const transporter = require('./email_config');

const app = express();
const port = 3000; 

app.use(express.json()); // This is necessary to parse JSON request bodies

db_connection.connect((err) => {
    if (err) {
      console.error('Помилка підключення до бази даних:', err);
      return;
    }
    console.log('Підключено до бази даних');
  });

app.use(express.static('public'));
// Настройка сессии
app.use(session({
  secret: 'barberkey', // Замените на свой секретный ключ
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Для HTTPS установите в true
}));


app.get('/', function (req, res) {
    const options = {
      root: path.join(__dirname)
    }; 
  
    const fileName = '/public/index.html';
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', fileName);
      }
    });
  });
 


  app.get('/services_with_markup', (req, res) => {
    const query = 'SELECT * FROM services_with_markup';
  
    db_connection.query(query, (err, results) => {
      if (err) {
        console.error('Помилка запиту до бази даних:', err);
        res.status(500).json({ error: 'Помилка сервера' });
        return;
      }
  
      res.json(results);
    });
  });
  
 app.post('/getPricesByCategory', (req, res) => {
    const barberCategory = req.body.category;
   
  
        db_connection.query('CALL GetPricesByCategory(?)', [barberCategory], (error, results, fields) => {
            if (error) {
                console.error('Error:', error);
                res.status(500).send('Internal Server Error');
                return;
            }
    
            // Assuming the results are in the first element of the returned array
            res.json(results[0]);
        });
   
     
});
app.post('/GetAvailableDaysForBarber', (req, res) => {
  const barberId = req.body.barberId;


      db_connection.query('CALL GetAvailableDaysForBarber(?);', [barberId], (error, results, fields) => {
          if (error) {
              console.error('Error:', error);
              res.status(500).send('Internal Server Error');
              return;
          }
  
          // Assuming the results are in the first element of the returned array
          res.json(results[0]);
      });
 
   
});
app.post('/GetAvailableTime', (req, res) => {
  const barberId = req.body.barberId;
  const date = req.body.date;
   
      db_connection.query("CALL GetAvailableTimes(?, ?);", [barberId,date], (error, results, fields) => {
          if (error) {
              console.error('Error:', error);
              res.status(500).send('Internal Server Error');
              return;
          }
  
          // Assuming the results are in the first element of the returned array
          res.json(results[0]);
      });
 
   
});
app.post('/getAvaibleBarberinDay', (req, res) => {
 
  const date = req.body.date;
   
      db_connection.query("CALL GetAvailableBarbersForDay(?);", [date], (error, results, fields) => {
          if (error) {
              console.error('Error:', error);
              res.status(500).send('Internal Server Error');
              return;
          }
  
          // Assuming the results are in the first element of the returned array
          res.json(results[0]);
      });
 
   
});
// ... (остальная часть кода)

app.post('/CheckLogin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password);
  db_connection.query("CALL CheckBarberLogin(?, ?);", [email, password], (error, results, fields) => {
      if (error) {
          console.error('Error:', error);
          res.status(500).send('Internal Server Error');
          return;
      }
      console.log(results[0]);
      // Проверяем, есть ли пользователь с такими данными
      if (results[0][0].IsValidLogin === 1) {
          // Пользователь найден, создаем для него сессию
          req.session.user = { id: results[0][0].id, email: email };
          res.json({ success: true });
      } else {
          // Пользователь не найден
          res.json({ success: false });
      }
  });
});

app.get('/barberAcount.html', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'security', 'barberAcount.html'));
});

// Функция для проверки аутентификации пользователя
function checkAuth(req, res, next) {
  if (!req.session.user) {
      res.status(401).send('Необхідно увійти в систему');
  } else {
      next();
  }
}

// ... (остальная часть кода)

app.post('/SendForm', (req, res) => {
  const { barberId, serviceId, phone, email, name, date, time } = req.body;

  db_connection.query('CALL CreateClientAndAppointment(?,?,?,?,?,?,"scheduled");', 
      [name, phone, email, barberId, serviceId, date + " " + time], 
      (error, results, fields) => {
          if (error) {
              console.error('Error:', error);
              res.status(500).send('Internal Server Error');
              return;
          }
  
         
          const mailOptions = {
              from: 'gchat5571@gmail.com', 
              to: email, 
              subject: 'Інформація про запис до барбершопу', 
              text: `Привіт,${name}! Ваш візит запланований на  ${date}  ${time}`
          };

          transporter.sendMail(mailOptions, (mailError, info) => {
              if (mailError) {
                  console.log('Email error:', mailError);
                  res.status(500).send('Сталась помилка.Спробуйте ще раз');
              } else {
                  console.log('Email sent: ' + info.response);
                  res.status(200).send('Ви успішно записалаись. На вашу пошту прийшло деталі запису');
              }
          });

      });
     
});
  app.get('/barber_details', (req, res) => {
    const query = 'SELECT * FROM barber_details';
  
    db_connection.query(query, (err, results) => {
      if (err) {
        console.error('Помилка запиту до бази даних:', err);
        res.status(500).json({ error: 'Помилка сервера' });
        return;
      }
  
      res.json(results); // Надсилаємо результати на клієнтську сторону
    });
  });


// Запускаємо сервер 
app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});

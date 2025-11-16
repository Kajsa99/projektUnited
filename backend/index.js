const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const smultronRoutes = require("./routes/smultronRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// routers
app.use("/api/smultron", smultronRoutes);
app.use("/api/users", userRoutes);

// serve frontend
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get(/.*/, (req, res) => {
//  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

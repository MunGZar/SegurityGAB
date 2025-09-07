
use segurityGAB;
CREATE TABLE Proveedor (
  ID_Proveedor INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Correo VARCHAR(100) UNIQUE,
  Telefono VARCHAR(20),
  Direccion VARCHAR(150),
  Contacto VARCHAR(100)
);

CREATE TABLE Producto (
  ID_Producto INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Referencia VARCHAR(50) UNIQUE NOT NULL,
  Marca VARCHAR(50),
  Descripcion TEXT,
  Precio DECIMAL(10,2) CHECK (Precio > 0),
  Stock INT DEFAULT 0 CHECK (Stock >= 0),
  ID_Proveedor INT,
  FOREIGN KEY (ID_Proveedor) REFERENCES Proveedor(ID_Proveedor)
);

CREATE TABLE Cliente (
  ID_Cliente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Apellido VARCHAR(100) NOT NULL,
  Correo VARCHAR(100) UNIQUE,
  Telefono VARCHAR(20),
  Direccion VARCHAR(150)
);

CREATE TABLE Venta (
  ID_Venta INT AUTO_INCREMENT PRIMARY KEY,
  Fecha DATE NOT NULL,
  ID_Cliente INT,
  Total DECIMAL(12,2),
  FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente)
);

CREATE TABLE Detalle_Venta (
  ID_Detalle INT AUTO_INCREMENT PRIMARY KEY,
  ID_Venta INT,
  ID_Producto INT,
  Cantidad INT CHECK (Cantidad > 0),
  Subtotal DECIMAL(10,2),
  FOREIGN KEY (ID_Venta) REFERENCES Venta(ID_Venta),
  FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);

CREATE TABLE Usuario (
  ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_Usuario VARCHAR(50) UNIQUE NOT NULL,
  Contraseña VARCHAR(255) NOT NULL,

  Rol ENUM('Admin', 'Cliente', 'Proveedor') NOT NULL
  
);

-- Datos de prueba
INSERT INTO Proveedor (Nombre, Correo, Telefono, Direccion, Contacto)
VALUES ('Dahua', 'contacto@dahua.com', '3001234567', 'Bogotá', 'Juan Pérez');

INSERT INTO Producto (Nombre, Referencia, Marca, Precio, Stock, ID_Proveedor)
VALUES ('Cámara IP 2MP', 'IPC-HDW2231T', 'Dahua', 250000, 50, 1);

INSERT INTO Cliente (Nombre, Apellido, Correo, Telefono, Direccion)
VALUES ('Carlos', 'Gómez', 'carlosg@example.com', '3109876543', 'Calle 123 #45-67');

INSERT INTO Venta (Fecha, ID_Cliente, Total)
VALUES (CURDATE(), 1, 250000);

INSERT INTO Detalle_Venta (ID_Venta, ID_Producto, Cantidad, Subtotal)
VALUES (1, 1, 1, 250000);

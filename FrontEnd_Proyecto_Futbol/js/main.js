
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Grupo222:claveGrupo2@Grupo222.mysql.pythonanywhere-services.com/Grupo222$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Modelo
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nomprod = db.Column(db.String(100))
    precio = db.Column(db.Float)
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(200))
    descrip = db.Column(db.String(200))

# Esquema
class ProductoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Producto

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

# Ruta para crear un nuevo producto
@app.route('/productos', methods=['POST'])
def add_producto():
    nomprod = request.json['nomprod']
    precio = request.json['precio']
    stock = request.json['stock']
    imagen = request.json['imagen']
    descrip = request.json['descrip']

    nuevo_producto = Producto(nomprod=nomprod, precio=precio, stock=stock, imagen=imagen, descrip=descrip)
    
    db.session.add(nuevo_producto)
    db.session.commit()

    return producto_schema.jsonify(nuevo_producto)

# Programa principal
if __name__ == '__main__':
    app.run(debug=True, port=5000)


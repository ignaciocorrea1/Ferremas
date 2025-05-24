# **Ferremas**
 
Ferremas es una distribuidora establecida en la comuna de Santiago desde la década de los 80. En esta, se puede encontrar una amplia gama de productos, desde herramientas manuales y eléctricas, pinturas, materiales eléctricos, hasta accesorioss y articulos de seguridad. 

Debido a la pandemia global de Covid-19 en 2020, el sector de la construcción y ferretería enfrentó desafíos, especialmente en términos de ventas físicas. Ferremas, al igual que otras empresas, experimentó una disminuición en las ventas debido a las restricciones de movilidad y a la menor afluencia de clientes. Tras varias reuniones con los administradores de las distintas sucursales, se identificó un problema crucial, Ferremas no contaba con una plataforma de venta en línea. Es por esto, que surge la necesidad de una solución de comercio electrónico lo antes posible.

## Tecnologías utilizadas 📖

El sitio web Ferremas fue desarrollado con las siguientes tecnologias:

1. **Python:** Lenguaje de programación utilizado para la lógica del servidor.
2. **HTML:** Lenguaje de marcado utilizado para estructurar páginas web.
3. **CSS:** Lenguaje de estilo utilizado para diseñar la interfaz de usuario.
4. **JavaScript:** Lenguaje de programación utilizado para hacer las páginas web interactivas.
5. **Django:** Framework web para crear aplicaciones web seguras y escalables.
6. **Django Tailwind:** Herramienta para integrar el Framework de CSS Tailwind con Django.

## Arquitectura utilizada 🏛️

Django se basa en el patrón **MVT (Modelo - Vista - Plantilla)**, que es una adaptación del patrón **MVC (Modelo - Vista - Controlador)**. El patrón MVT es el enfoque de Django para organizar el código y el flujo de trabajo en una aplicación web. Cada componente realiza funciones específicas y luego transfiere el proceso a los demás componentes para que realicen las suyas.

- **Modelo:** También conocida como capa de datos, gestiona los datos e interactúa con la base de datos.
- **Vista:** También conocida como capa lógica, actúa como intermediario, maneja la lógica y administra el flujo de datos.
- **Plantilla:** También conocida como capa de presentación, representa el contenido HTML en la interfaz de usuario.

A continuación, se visualiza como es la comunicación entre componentes:

![Imagen de cómo es el patrón arquitectónico MVT](https://espifreelancer.com/images/Django_mtv.webp)

## Requisitos previos 🔧

Es necesario que tengas los siguientes programas instalados para que el proyecto se ejecute correctamente:

- ``` Python 3.13.1+ ``` 

- ``` Pip 25.1.1+ ``` 

- ```Node 20.16.0+ ``` 

- ```npm 10.8.1+ ``` 

Para verificar que los tengas:

1. Abre la terminal y verifica la instalación de **Python** con **"python --version"**
2. En la terminal, verifica la instalación de **Pip** con **"pip --version"**
3. En la terminal, verifica la instalación de **Node.js** con **"node --version"**
4. En la terminal, verifica la instalación de **npm** con **"npm --version"**

## Instalación 🔧

Sigue los siguientes pasos para instalar las dependencias del proyecto:

1. Abre la terminal y ejecuta el siguiente comando para dirigirte a la carpeta core **"cd core"**
2. Una vez te encuentres en la ruta, ejecuta el comando **"pip install -r requirements.txt"**
3. Una vez instaladas las dependencias, vuelve a la ruta anterior con **"cd .."**
2. Luego, ejecuta el siguiente comando para instalar Tailwind **"python manage.py tailwind install"**

## Ejecución 🚀

Para ejecutar el proyecto sigue los siguientes pasos:

1. Inicia tailwind con el comando **"python manage.py tailwind start"**
2. Abre otra terminal y ejecuta el servidor de desarrollo con **"python manage.py runserver"**

## Integrantes 🤝

- Joaquín Armijo
- Ignacio Correa
- Fernando Flores
- Jaime Vergara

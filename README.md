 Documentación Técnica


  1. Descripción
  TaskFlows es una API REST diseñada para la gestión de tareas empresariales en tiempo real. El sistema permite administrar el
  ciclo de vida de una tarea desde su creación hasta su procesamiento final, utilizando estructuras de datos clásicas implementadas
  manualmente para garantizar eficiencia en memoria.


  Estructuras Implementadas:
   * Lista Enlazada (Linked List): Gestiona el Backlog. Permite inserciones dinámicas y eliminaciones por ID en $O(n)$ sin los
     re-indexamientos costosos de un array tradicional.
   * Pila (Stack): Gestiona el historial de Undo (Deshacer). Sigue el principio LIFO (Last In, First Out), permitiendo revertir la
     última acción registrada.
   * Cola (Queue): Gestiona la Cola de Procesamiento. Sigue el principio FIFO (First In, First Out), asegurando que las tareas se
     atiendan estrictamente en orden de llegada.


  2. Stack Tecnológico
   * Lenguaje: JavaScript (Node.js v18+)
   * Framework: Express.js (Gestión de rutas y middleware)
   * Dependencias:
       * uuid: Generación de IDs únicos universales.
       * cors: Permitir peticiones desde navegadores web.
       * path: Manejo de rutas de archivos estáticos.


  3. Guía de Ejecución
  Para levantar el servidor localmente, sigue estos comandos:


   1 # 1. Entrar a la carpeta del proyecto
   2 cd taskFlows
   3
   4 # 2. Instalar dependencias
   5 npm install
   6
   7 # 3. Iniciar el servidor
   8 npm start
  El servidor iniciará en http://localhost:3000. Si el puerto 3000 está ocupado, intentará automáticamente con el 3001.

  4. Arquitectura del Sistema
  La aplicación sigue una Arquitectura por Capas para separar responsabilidades:


   * 📁 Model (`src/models`): Define la forma de los datos (Task, Action).
   * 📁 Utils (`src/utils`): Contiene las implementaciones manuales de LinkedList, Stack y Queue. Aquí vive la lógica de las
     estructuras.
   * 📁 Repository (`src/repositories`): Es la única capa que interactúa con las estructuras de datos en memoria. Actúa como
     nuestra "Base de Datos".
   * 📁 Service (`src/services`): Contiene la lógica de negocio. Por ejemplo, al crear una tarea en el backlog, el servicio se
     encarga de registrar automáticamente esa acción en la pila de Undo.
   * 📁 Controller (`src/controllers`): Gestiona la comunicación HTTP. Valida los datos de entrada y retorna los códigos de estado
     correspondientes (201, 200, 204, 400, 404).

  ---

  5. Endpoints y Ejemplos (cURL)


  📋 Backlog (Lista Enlazada)

  ┌──────────┬──────────────────────────┬─────────────────────────┬──────────────┐
  │ Método   │ Endpoint                 │ Descripción             │ Código Éxito │
  ├──────────┼──────────────────────────┼─────────────────────────┼──────────────┤
  │ POST   │ /api/backlog/tasks     │ Crear una nueva tarea   │ 201          │
  │ GET    │ /api/backlog/tasks     │ Listar todas las tareas │ 200          │
  │ DELETE │ /api/backlog/tasks/:id │ Eliminar tarea por ID   │ 204          │
  └──────────┴──────────────────────────┴─────────────────────────┴──────────────┘

  Ejemplo Crear Tarea:


   1 curl -X POST http://localhost:3000/api/backlog/tasks \
   2      -H "Content-Type: application/json" \
   3      -d '{"title": "Revisar Servidores", "employeeName": "Ana"}'


  🔄 Undo (Pila)

  ┌──────────┬──────────────────┬────────────────────────────────┬──────────────┐
  │ Método   │ Endpoint         │ Descripción                    │ Código Éxito │
  ├──────────┼──────────────────┼────────────────────────────────┼──────────────┤
  │ GET    │ /api/undo/peek │ Ver última acción (sin borrar) │ 200          │
  │ DELETE │ /api/undo      │ Deshacer (pop) última acción   │ 200          │
  └──────────┴──────────────────┴────────────────────────────────┴──────────────┘

  Ejemplo Deshacer:
   1 curl -X DELETE http://localhost:3000/api/undo


  ⏳ Queue (Cola de Procesamiento)

  ┌──────────┬───────────────────┬───────────────────────────────┬──────────────┐
  │ Método   │ Endpoint          │ Descripción                   │ Código Éxito │
  ├──────────┼───────────────────┼───────────────────────────────┼──────────────┤
  │ POST   │ /api/queue      │ Enviar tarea al procesamiento │ 201          │
  │ GET    │ /api/queue/next │ Ver quién sigue en la cola    │ 200          │
  │ DELETE │ /api/queue      │ Procesar (dequeue) siguiente  │ 200          │
  └──────────┴───────────────────┴───────────────────────────────┴──────────────┘

  Ejemplo Encolar Tarea:


   1 curl -X POST http://localhost:3000/api/queue \
   2      -H "Content-Type: application/json" \
   3      -d '{"id": "ID_DE_LA_TAREA_AQUI"}'


  ---
  Nota: La aplicación también incluye un Frontend Web accesible directamente en `http://localhost:3000` para probar estas funciones
  de manera visual.

▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
 > Ejemplo mínimo de sección "Probar con cURL"

   # Crear tarea en backlog
   curl -i -X POST http://localhost:3000/backlog/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Aprender colas"}'

   # Listar backlog
   curl -i http://localhost:3000/backlog/tasks

   # Encolar una tarea (por id)
   curl -i -X POST http://localhost:3000/queue \
     -H "Content-Type: application/json" \
     -d '{"taskId":"<id>"}'

   # Ver siguiente en cola
   curl -i http://localhost:3000/queue/next

   # Procesar siguiente (dequeue)
   curl -i -X DELETE http://localhost:3000/queue
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
✦ Aquí tienes la sección de pruebas con cURL ajustada exactamente a los endpoints de la aplicación:

  🧪 Probar con cURL

  Asegúrate de que el servidor esté corriendo en http://localhost:3000.
  Nota: Si estás usando la versión con prefijo `/api`, añade `/api` antes de cada ruta.






    1 # 1. Crear tarea en el backlog
    2 curl -i -X POST http://localhost:3000/api/backlog/tasks \
    3   -H "Content-Type: application/json" \
    4   -d '{"title": "Aprender colas", "employeeName": "Juan"}'
    5
    6 # 2. Listar todas las tareas del backlog
    7 curl -i http://localhost:3000/api/backlog/tasks
    8
    9 # 3. Encolar una tarea para procesamiento (reemplaza <id> por el ID generado en el paso 1)
   10 curl -i -X POST http://localhost:3000/api/queue \
   11   -H "Content-Type: application/json" \
   12   -d '{"id": "<id>"}'
   13
   14 # 4. Ver quién es el siguiente en la cola (Front/Peek)
   15 curl -i http://localhost:3000/api/queue/next
   16
   17 # 5. Atender/Procesar la siguiente tarea (Dequeue)
   18 curl -i -X DELETE http://localhost:3000/api/queue
   19
   20 # 6. Ver la última acción registrada en la pila (Undo Peek)
   21 curl -i http://localhost:3000/api/undo/peek
   22
   23 # 7. Deshacer la última acción (Undo Pop)
   24 curl -i -X DELETE http://localhost:3000/api/undo


  💡 Códigos de Respuesta Esperados:
   * 201 (Created): Al crear tareas o acciones exitosamente.
   * 200 (OK): Al listar, obtener o procesar recursos.
   * 204 (No Content): Al eliminar una tarea del backlog exitosamente.
   * 400 (Bad Request): Si el body está incompleto (ej: falta el título).
   * 404 (Not Found): Si el ID no existe o si la cola/pila están vacías.

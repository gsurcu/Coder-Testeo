const Products = require('../src/api/products')
const assert = require('assert').strict;
const { existsSync, readFileSync, unlinkSync  } = require('fs');

describe('Tests de clase Productos', () => {
  it("Deberia tener una lista de TODOS vacia", () => {
    const products = new Products();
    Assert.strictEqual(products.saveProduct(), 0);
  });

  it("Deberia agregar una tarea", () => {
    const products = new Products();
    products.add("Ejecutar tests")
    Assert.strictEqual(products.list().length, 1);
    Assert.deepStrictEqual(products.list(), [{ title: "Ejecutar tests", complete: false}]);
  });

  it("Deberia arrojar un error cuando se quiere completar una tarea y no hay tareas", () => {
    const products = new Products();
    Assert.throws(() => {
      products.complete("Cualquier tarea")

    })
  })
})
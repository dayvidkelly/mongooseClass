const faunadb = require("faunadb");
const client = new faunadb.Client({
  secret: "fnAELK6noOACAfscY3A6lQtFn-9nfzzq06NHQtD3",
});

const {
  Get,
  Ref,
  Collection,
  Map,
  Paginate,
  Match,
  Index,
  Lambda,
  Var,
  Create,
} = faunadb.query;
const fs = require("fs-extra");
//-----------------------------------------------------
class Database {
  constructor() {}

  /**
   * @param {String} index is the index label from database
   * @returns the found documents else log the erros if document is not found
   */
  async selectAll(index) {
    const docs = await client
      .query(Map(Paginate(Match(Index(index))), Lambda("X", Get(Var("X")))))
      .catch(async (e) => {
        this.errorLogger(e);
        let error = {
          error: true,
          text: `Something went wrong and it has been log.`,
        };
        return error;
      });
    return docs;
  }

  /**
   *
   * @param {String} collection Define the targeted collection.
   * @param {String} _id define the id of the target document.
   * @returns if no error are found, shall return the object found
   */
  async getSingleById(collection, _id) {
    console.clear();
    const doc = await client
      .query(Get(Ref(Collection(collection), _id)))
      .catch(async (e) => {
        this.errorLogger(e);

        let error = {
          error: true,
          text: `Something went wrong and it has been log.`,
        };
        e.name == "NotFound" ? (error.text = e.name) : false;
        return error;
      });

    return doc;
  }

  async insertOne(collection, data) {
    const doc = await client.query(
      Create(Collection(collection), {
        data: data,
      })
    );
    return doc;
  }

  async errorLogger(e) {
    let logFile = `databaselog.json`;
    const path = `${__dirname}/${logFile}`;
    //--------------------------------------------------------------------
    let actualsError = JSON.parse(await fs.readFile(path));
    //--------------------------------------------------------------------
    let error = {
      name: e.name,
      message: e.message,
      description: e.description,
      date: new Date().toISOString(),
    };

    actualsError.push(error);
    await fs.writeFile(path, JSON.stringify(actualsError));
  }
}
module.exports = Database;

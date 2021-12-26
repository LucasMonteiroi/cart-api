/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');

class MongoAdapter {
  async connect() {
    this.connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  formatResponse({ response }) {
    if (!response) return null;

    if (Array.isArray(response))
      return response.map((item) => this.setSchema({ data: item }));

    return this.setSchema({ data: response });
  }

  setSchema({ data }) {
    const { _id, _doc } = data;

    return {
      document: _doc,
      id: _id,
    };
  }

  async create(model, payload) {
    const created = await model.create(payload);

    return this.formatResponse({ response: created });
  }

  async deleteById(model, _id) {
    const data = await model.deleteOne({ _id });
    return !!data;
  }

  async find(model) {
    const documents = await model.find();

    return this.formatResponse({ response: documents });
  }

  async findFilter(model, filter) {
    const data = await model.find(filter);
    return this.formatResponse({ response: data });
  }

  async findById(model, _id) {
    const document = await model.findOne({ _id });
    return this.formatResponse({ response: document });
  }

  async updateById(model, _id, payload) {
    await model.updateOne({ _id }, { $set: payload });
    const document = await this.findById(model, _id);
    return document;
  }
}

module.exports = new MongoAdapter();

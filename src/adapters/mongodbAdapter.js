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
    const { _id, deleted, ...entity } = data;

    return {
      ...entity,
      id: _id.toString(),
    };
  }

  async create(model, payload) {
    const data = {
      ...payload,
      deleted: false,
    };

    await model.create(data);

    return this.formatResponse({ data });
  }

  async deleteById(model, _id) {
    await this.updateById(model, _id, {
      deleted: true,
    });
  }

  async find(model) {
    const documents = await model.find();

    return this.formatResponse({ data: documents });
  }

  async findFilter(model, filter) {
    const data = await model.find(filter).toArray();
    return this.formatResponse({ data });
  }

  async findById(model, _id) {
    const document = await model.findOne({ _id });
    return this.formatResponse({ data: document });
  }

  async updateById(model, _id, payload) {
    await model.updateOne({ _id }, { $set: payload });
    const document = await this.findById(model, _id);
    return document;
  }
}

module.exports = new MongoAdapter();

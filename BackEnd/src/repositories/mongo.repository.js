/**
 * Thin adapter that exposes a Mongoose model through the shared
 * repository interface (find / findOne / findById / count / create /
 * updateById / deleteById).
 */
export default class MongoRepository {
  constructor(model) {
    this.model = model;
  }

  async find({ filter = {}, sort = '-createdAt', skip = 0, limit = 0 } = {}) {
    let query = this.model.find(filter).sort(sort);
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);
    return query.lean();
  }

  async findOne(filter = {}) {
    return this.model.findOne(filter).lean();
  }

  async findById(id) {
    return this.model.findById(id).lean();
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async create(data) {
    const doc = await this.model.create(data);
    return doc.toObject();
  }

  async updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id).lean();
  }
}

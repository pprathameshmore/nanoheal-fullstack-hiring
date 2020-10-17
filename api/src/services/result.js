//Result DAO
const Container = require("typedi").Container;
const Result = require("../models/result");
const { GeneralError } = require("../utils/errors");

class ResultDAO {
  //Create DAO operations
  async createResult({
    status,
    repositoryName,
    findings,
    queuedAt,
    scanningAt,
    finishedAt,
  }) {
    //create result
    try {
      return await Result.create({
        status,
        repositoryName,
        findings,
        queuedAt,
        scanningAt,
        finishedAt,
      });
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  //Read Operation
  async getResult(id) {
    try {
      return await Result.findById(id);
    } catch (error) {
      throw new GeneralError(error);
    }
  }
  //Read all result operation
  async getResults() {
    try {
      return await Result.find();
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  //Update result operation
  async updateResult(id, updateData) {
    try {
      const options = { new: true, runValidators: true };
      return await Result.findByIdAndUpdate(id, updateData, options);
    } catch (error) {
      return new GeneralError(error);
    }
  }

  //Delete result
  async removeResult(id) {
    try {
      return await Result.findByIdAndRemove(id);
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  //Delete results
  async removeResults() {
    try {
      return await Result.deleteMany();
    } catch (error) {
      throw new GeneralError(error);
    }
  }
}

module.exports = Container.get(ResultDAO);

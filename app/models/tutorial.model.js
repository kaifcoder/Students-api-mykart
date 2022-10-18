module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      rollno: Number,
      name: String,
      address: String,
      email: String,
      class: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Students = mongoose.model("Students", schema);
  return Students;
};

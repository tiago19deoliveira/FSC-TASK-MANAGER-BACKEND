const notAllowedFieldsToUpdate = (res) => {
    return res.status(500).send("Um ou mais campos inseridos não editáveis");
};

module.exports = {
    notAllowedFieldsToUpdate,
};

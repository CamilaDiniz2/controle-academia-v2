const fs = require('fs');
const data = require('../data.json');
const { date } = require('../utils');

// create
exports.create = (req, res) => {
  return res.render('members/create');
};

// mostra todos os instrutores na tela
exports.index = (req, res) => {
  return res.render('members/index', { members: data.members });
};

// create a new member
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') return res.send('Please, fill all fields');
  }

  birth = Date.parse(req.body.birth);

  let id = 1;
  const lastMember = data.members[data.members.length - 1];
  if (lastMember) id = lastMember.id + 1;

  data.members.push({
    id,
    ...req.body,
    birth,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error !!!');
    return res.redirect(`/members/${id}`);
  });
};

//show a member by id
exports.show = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.render('members/not-found');

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay,
  };

  return res.render('members/show', { member });
};

// edit
exports.edit = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.send('Member not found');

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso,
  };

  date(foundMember.birth);

  return res.render('members/edit', { member });
};

// put --> editar dados do instrutor
exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function (member, foundIndex) {
    if (member.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.render('members/not-found');

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(foundMember.id),
  };

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file not possible');

    return res.redirect(`members/${id}`);
  });
};

// deleta um instrutor de
exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter((member) => {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Can not write on file');
    return res.redirect('/members');
  });
};

/* eslint-disable consistent-return */
const jsonpatch = require('json-patch');
const jimp = require('jimp');
const url = require('url');
const path = require('path');

const validURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return pattern.test(str);
};

exports.jsonpatch = (req, res) => {
  if (!req.body.jsonobject || !req.body.jsonpatchobject) return res.status(400).send({ error: 'please provide a json argument' });
  const jsonObject = JSON.parse(req.body.jsonobject);
  const jsonPatchObject = JSON.parse(req.body.jsonpatchobject);

  if (typeof jsonObject !== 'object' || typeof jsonPatchObject !== 'object') return res.status(400).send({ error: 'Please pass object or array. Can only patch object or array' });

  const document = jsonpatch.apply(jsonObject, jsonPatchObject);

  res.status(200).send({ document });
};

exports.thumbnail = (req, res) => {
  if (!req.body.image || !validURL(req.body.image)) return res.status(400).send({ error: 'please provide a valid image url' });

  const parsedfilename = url.parse(req.body.image);
  const filename = path.basename(parsedfilename.pathname);
  const resizedPath = './public/images/resized/';
  const uploadedPath = './public/images/uploaded/';
  jimp
    .read(req.body.image)
    .then((image) => {
      const ext = image.getExtension();

      image.write(`${uploadedPath + filename}.${ext}`);
      image
        .resize(50, 50) // resize
        .quality(100) // set quality
        .write(`${resizedPath + filename}.${ext}`);
      return res.json({
        success: true,
        thumbnail: `./images/resized/${filename}.${ext}`,
      });
    })
    .catch((err) => {
      // Handle an exception.
      res.status(400).json({
        error: err,
        message: 'something went wrong,Please check image url',
      });
    });
};

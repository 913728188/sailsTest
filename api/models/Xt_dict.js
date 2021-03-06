/**
 * Xt_dict.js
 *
 * @description :: TODO: 字典子项.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {  //主键
      type: 'string',
      columnType: 'varchar(50)',
      maxLength: 50,
      unique: true,
      required: true
    },
    parent_id: {  //大分类标识ID
      model: "Xt_dict"
    },
    code: {  //编码  与ID保持一致
      type: 'string',
      columnType: 'varchar(50)',
      maxLength: 50
    },
    name: {  //字典名称
      type: 'string',
      columnType: 'varchar(50)',
      maxLength: 50
    },
    name_en: {//英文名
      type: 'string',
      columnType: 'varchar(50)',
      maxLength: 50,
      allowNull: true
    },
    vals: {  //对应值
      type: 'string',
      columnType: 'varchar(100)',
      maxLength: 100,
      allowNull: true
    },
    remarks: {  //备注
      type: 'string',
      columnType: 'varchar(1000)',
      maxLength: 1000,
      allowNull: true
    },
    children: {
      collection: 'Xt_dict',
      via: 'parent_id'
    }
  },

  beforeDestroy: async function (value, cb) {
    let dicts = await Xt_dict.find(value.where);

    let ids = [];
    for (let dict of dicts) {
      ids.push(dict.id);
    }
    if (ids.length > 0) {
      Xt_dict.destroy({
        parent_id: ids
      }).exec(function (err, res) {
        if (err) cb(err);
        else cb();
      });
    } else {
      cb();
    }
  }

};


module.exports = (sequelize, DataTypes) => {
    var persons = sequelize.define('persons', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                isInt: true
            }
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            set: function (val) {
                this.setDataValue('firstName', val.charAt(0).toUpperCase() + val.slice(1).toLowerCase());
            }
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true,
            set: function (val) {
                this.setDataValue('middleName', val.charAt(0).toUpperCase() + val.slice(1).toLowerCase());
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            set: function (val) {
                this.setDataValue('lastName', val.charAt(0).toUpperCase() + val.slice(1).toLowerCase());
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Male',
            validate: {
                isIn: {
                    args: [['Male', 'Female', 'Other']],
                    msg: "Value should be Male or Female or Other"
                }
            }
        },
        bod: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true,
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: true,
        getterMethods: {
            fullName() {
                return this.firstName + (this.middleName ? ' ' + this.middleName : ' ') + this.lastName
            }
        },
        setterMethods: {
            fullName(value) {
                const names = value.split(' ');

                this.setDataValue('firstName', names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase());
                if (names[2]) {
                    this.setDataValue('middleName', names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase());
                    this.setDataValue('lastName', names[2].charAt(0).toUpperCase() + names[2].slice(1).toLowerCase());
                } else {
                    this.setDataValue('lastName', names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase());
                }
            },
        },
        tableName: 'persons',
    });
    persons.associate = function (models) {
        // associations can be defined here
    };
    return persons;
};
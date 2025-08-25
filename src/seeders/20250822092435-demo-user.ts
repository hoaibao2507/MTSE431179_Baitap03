import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    return queryInterface.bulkInsert('users', [
      {
        email: 'john.doe@example.com',
        password: '123456', // bạn có thể hash bằng bcrypt
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St, New York',
        phoneNumber: '123456789',
        gender: true, // true = nam, false = nữ
        image: null,
        roleId: 'R1',
        positionId: 'P1',
        createAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'jane.smith@example.com',
        password: 'abcdef',
        firstName: 'Jane',
        lastName: 'Smith',
        address: '456 Park Ave, London',
        phoneNumber: '987654321',
        gender: false,
        image: null,
        roleId: 'R2',
        positionId: 'P2',
        createAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('users', {}, {});
  }
};

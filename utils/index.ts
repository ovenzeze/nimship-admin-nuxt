import type { DeliveryRecordView } from "~/types"

export const calculateProfit = (row: DeliveryRecordView) => {
  const driverSalary = (row.total_order_cnt * row.settle_rate).toFixed(2)
  const income = (Number(row.total_salary).toFixed(2))
  const profit = (Number(income) - Number(driverSalary)).toFixed(2)
  const profitRate = (Number(profit) / Number(income)).toFixed(4)
  return { salary: driverSalary, income, profit, rate: profitRate }
}

/**
 * 创建一个类似枚举的对象，其键为给定类型的属性名
 * @template T - 输入类型
 * @returns 一个对象，其键为T的属性名，值为相同的字符串
 */
export function createEnumFromType<T extends object>() {
  return new Proxy({} as { [K in keyof T]: K & string }, {
    get: (_, prop: string) => prop,
    ownKeys: function (target) {
      // 这里我们返回一个空数组，因为我们不能在运行时知道T的键
      // 但TypeScript仍然会正确地推断出键的类型
      return [];
    },
    getOwnPropertyDescriptor: function (_, prop) {
      // 为每个属性提供一个属性描述符
      return {
        enumerable: true,
        configurable: true,
      };
    }
  }) as { readonly [K in keyof T]: K & string };
}




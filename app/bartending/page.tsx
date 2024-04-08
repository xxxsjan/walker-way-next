"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { title, subtitle } from "@/components/primitives";
const sourceArr = [
  [2, 0, 2, "提纯浮羊奶"],
  [1, 0, 0, "星空香槟"],
  [1, 0, -1, "椒椒博士"],
  [1, 0, -2, "冰点苏乐达"],
  [-1, 0, -1, "安神气泡饮"],
  [-1, 0, -2, "醒神苏打水"],
  [-2, 0, 1, "怪味浓汁"],
  [0, 2, 1, "激梦果酱"],
  [0, 1, 2, "极致糖浆"],
  [0, 1, -1, "苏花清露"],
  [0, -1, 1, "夕红果沙司"],
  [0, -1, 0, "魔血能量"],
  [0, -2, 2, "传统老豆汁儿"],
];

function nestedForLoop(arr: any, depth: any) {
  const res: any = [];
  function loop(currentDepth: any, currentValues: any) {
    if (currentDepth === depth) {
      res.push({
        group: currentValues,
        result: currentValues
          .reduce(
            (a: any, b: any) => {
              a[0] = b[0] + a[0];
              a[1] = b[1] + a[1];
              a[2] = b[2] + a[2];
              return a;
            },
            [0, 0, 0]
          )
          .join(","),
      });
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const updatedValues = [...currentValues, arr[i]];
      loop(currentDepth + 1, updatedValues);
    }
  }

  loop(0, []);

  return res;
}
const allRes: any = {
  3: nestedForLoop(sourceArr, 3),
  4: nestedForLoop(sourceArr, 4),
  5: nestedForLoop(sourceArr, 5),
};
export default function PricingPage() {
  const [tiandu, setTiandu] = useState("0");
  const [liedu, setLiedu] = useState("0");
  const [nongchoudu, setNongchoudu] = useState("0");
  const [count, setCount] = useState("3");

  const findStr = useMemo(() => {
    return `${tiandu},${liedu},${nongchoudu}`;
  }, [tiandu, liedu, nongchoudu]);

  const [result, setResult] = useState([]);

  useEffect(() => {
    const f = allRes[count].filter((f: any) => f.result === findStr);
    console.log("findStr, count", findStr, count, allRes[count], f);
    setResult(f);
  }, [findStr, count]);

  return (
    <div>
      <div className="mb-6">
        {" "}
        <h1 className={title({ color: "violet" })}>调酒推演</h1>
      </div>

      <div className="mb-4 text-left">
        <RadioGroup
          label=""
          orientation="horizontal"
          value={count}
          onValueChange={(val) => setCount(val)}
        >
          <Radio value="3">小杯(3)</Radio>
          <Radio value="4">大杯(4)</Radio>
          <Radio value="5">超大杯(5)</Radio>
        </RadioGroup>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 gap-4">
        <Input
          label="甜度"
          placeholder="0.00"
          labelPlacement="outside"
          type="number"
          value={tiandu}
          onValueChange={(val) => setTiandu(val)}
        />
        <Input
          label="烈度"
          placeholder="0.00"
          labelPlacement="outside"
          type="number"
          value={liedu}
          onValueChange={(val) => setLiedu(val)}
        />
        <Input
          label="浓稠度"
          placeholder="0.00"
          labelPlacement="outside"
          type="number"
          value={nongchoudu}
          onValueChange={(val) => setNongchoudu(val)}
        />
      </div>

      {result.length > 0 && (
        <div className="text-left">
          <div>方案{result.length > 0 && <span>-{result.length}种</span>}</div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>序号</TableColumn>
              <TableColumn>名称</TableColumn>
            </TableHeader>
            <TableBody>
              {result.map((m, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      {m.group.map((item) => item[3]).join(" , ")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      {result.length === 0 && <div>未找到方案</div>}
    </div>
  );
}

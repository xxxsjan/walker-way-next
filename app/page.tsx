"use client";
import React from "react";
import data, { mingtu } from "@/data/data";

import {
  CheckboxGroup,
  Tabs,
  Tab,
  Divider,
  Chip,
  RadioGroup,
  Radio,
  Button,
} from "@nextui-org/react";

import { CustomCheckbox } from "@/components/CustomCheckbox";

const _data = data.reduce((pre: any, cur: any) => {
  if (cur.children) {
    return [...pre, ...cur.children];
  } else {
    return pre;
  }
}, []);
function findCount(mt: string, order = 0) {
  let res = 0;
  for (let i = 0; i < _data.length; i++) {
    if (_data[i][order].data.includes(mt)) {
      res++;
    }
  }
  return res;
}

console.log(
  mingtu.reduce((pre: any, cur: any) => {
    const res = {
      name: cur,
      data: [findCount(cur, 0), findCount(cur, 1), findCount(cur, 2)].join("-"),
    };
    pre.push(res);
    return pre;
  }, [])
);

export default function Home() {
  const [list, setList] = React.useState(_data);
  // 位面1
  const firstData = _data.map((m: any) => {
    return m[0];
  });

  const mingtuData: any = mingtu;

  const [selected, setSelected] = React.useState([]);
  const [selected2, setSelected2] = React.useState();
  const [tabsSelectedKey, setTabsSelectedKey] = React.useState("mt");
  React.useEffect(() => {
    if (tabsSelectedKey === "mt") {
      if (selected.length > 0) {
        const _list = _data.filter((m: any) => {
          return m.some((item: any) => {
            return selected.some((s: any) => item.data.includes(s));
          });
        });
        setList(_list);
      } else {
        setList(_data);
      }
    }
    if (tabsSelectedKey === "wm") {
      if (selected2) {
        const _list = _data.filter((m: any) => {
          // @ts-ignore
          return selected2.includes(m[0].name);
        });
        setList(_list);
      } else {
        setList(_data);
      }
    }
  }, [selected, selected2, tabsSelectedKey]);
  const setBtnColor = (mt: string) => {
    if (tabsSelectedKey === "mt") {
      if (selected.length === 0) {
        return "primary";
      }
      // @ts-ignore
      if (selected.includes(mt)) {
        return "primary";
      }
      return;
    }
    return "primary";
  };
  const setBtnDisabled = (mt: string) => {
    if (tabsSelectedKey === "mt") {
      if (selected.length === 0) {
        return false;
      }
      // @ts-ignore
      return !selected.includes(mt);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4  min-w-[400px]">
      <div className="min-w-full text-center justify-center relative">
        <Tabs
          aria-label="Tabs radius"
          selectedKey={tabsSelectedKey}
          onSelectionChange={setTabsSelectedKey as any}
        >
          <Tab key="mt" title="命途">
            <CheckboxGroup
              label=""
              orientation="horizontal"
              color="secondary"
              value={selected}
              onValueChange={setSelected as any}
              classNames={{ wrapper: "justify-center" }}
            >
              {mingtuData.map((m: any) => (
                <CustomCheckbox key={m} value={m}>
                  {m}
                </CustomCheckbox>
              ))}
            </CheckboxGroup>
          </Tab>
          <Tab key="wm" title="位面一">
            <RadioGroup
              label=""
              orientation="horizontal"
              color="secondary"
              value={selected2}
              onValueChange={setSelected2 as any}
              classNames={{ wrapper: "justify-center" }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                {firstData.map((m: any) => (
                  <Radio key={m.name} value={m.name}>
                    {m.name}
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          </Tab>
        </Tabs>
        <p className="text-sm">推荐优先级：{"巡猎>毁灭>记忆>丰饶>虚无>存护>欢愉"}</p>
        <Divider className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3   gap-4">
          {list.map((item: any, index: number) => (
            <div key={index} className="flex flex-col justify-between">
              {item.map((m: any) => (
                <div key={m.name} className="flex  items-center mb-1">
                  <div className="w-1/3">{m.name}</div>
                  <div>
                    {m.data.split("，").map((mt: string) => (
                      <Chip
                        key={mt}
                        color={setBtnColor(mt)}
                        isDisabled={setBtnDisabled(mt)}
                        className="mr-1"
                      >
                        {mt}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
              <Divider className="my-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

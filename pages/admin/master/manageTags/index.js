import React, { useState, useEffect } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Button, useAccordionButton } from "react-bootstrap";
import { useRouter } from "next/router";
const _ = require("lodash");

import ConfirmModal from "../../../../components/ConfirmModal";
import TagForm from "../../../../components/Tag";
import { nanoid } from "nanoid";
import { getAllTag, updateTag } from "../../../../redux/actions/tag";
import { toast } from "react-toastify";

const ManageTags = (props) => {
  const [removedIds, setRemovedIds] = useState([]);

  const initState = [
    {
      id: nanoid(20),
      parentTagTitle: "",
      parentTagDisplayOrder: "",
    },
  ];
  const [data, setData] = useState(initState);

  useEffect(() => {
    console.log(data, "data");
  }, [data]);

  const onClickAddMore = (e, parentTagIndex = -1) => {
    console.log(parentTagIndex, "parent");
    setData((state) => {
      const newData = _.cloneDeep(state);

      if (parentTagIndex != -1) {
        const id = nanoid(20);
        newData[parentTagIndex].subTags.push({
          title: "",
          displayOrder: "",
          id,
        });
      } else {
        newData.push(initState[0]);
      }

      return newData;
    });
  };

  const router = useRouter();
  useEffect(() => {
    props.setTitle("Manage Tags");
    dispatch(getAllTag());
  }, []);

  const dispatch = useDispatch();

  const tags = useSelector((state) => state.tag);

  useEffect(() => {
    if (tags?.length) setData(tags);
  }, [tags]);

  const handleReset = () => {
    setData(tags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = "";
    const newData = data.map(
      ({ subTags, parentTagDisplayOrder, parentTagTitle, _id }) => {
        if (!parentTagDisplayOrder || !parentTagTitle) {
          error = "Please enter all parent tag title and display order";
          return;
        }
        let newSubTags;
        if (subTags) {
          newSubTags = subTags?.map(({ title, displayOrder, _id }) => {
            if (!title || !displayOrder) {
              if (!error) {
                error = `Please enter title and display order of subtags`;
              }
              return;
            }
            let subTagdata = { title, displayOrder };
            if (_id) {
              subTagdata["_id"] = _id;
            }
            return subTagdata;
          });
        }
        let data = { parentTagDisplayOrder, parentTagTitle };
        if (newSubTags) {
          data["subTags"] = newSubTags;
        }
        if (_id) {
          data["_id"] = _id;
        }

        return data;
      }
    );

    if (error) {
      return toast.error(error, { theme: "dark" });
    }

    dispatch(updateTag({ tagData: newData, removedIds }));
  };

  const onClickRemove = (id, parentTagIndex, tagId = -1) => {
    setData((state) => {
      const newData = [...state];

      if (tagId !== -1) {
        const newSubTags = newData[parentTagIndex]?.subTags?.filter(
          (subTag) => {
            if (subTag.id) {
              return subTag.id !== tagId;
            }
            return subTag._id !== tagId;
          }
        );
        newData[parentTagIndex].subTags = newSubTags;
      } else {
        newData.splice(parentTagIndex, 1);
      }

      return newData;
    });

    if (!id) {
      return;
    }
    console.log(id, "id");
    setRemovedIds((state) => [...state, id]);
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <Button variant="primary" onClick={decoratedOnClick}>
        {children}
      </Button>
    );
  }

  return (
    <>
      <div className="bg-color" style={{ padding: 20 }}>
        <Accordion defaultActiveKey="0">
          {data?.map((tag, index) => (
            <>
              <TagForm
                onClickAddMore={onClickAddMore}
                CustomToggle={CustomToggle}
                onClickRemove={onClickRemove}
                index={index}
                setData={setData}
                key={tag.index}
                data={tag}
              />
            </>
          ))}
        </Accordion>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClickAddMore}
            variant="secondary"
            style={{ alignSelf: "right", height: "fit-content" }}
          >
            Add More
          </Button>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{
              alignSelf: "center",
              height: "fit-content",
              marginLeft: 10,
            }}
          >
            Submit
          </Button>
          <Button
            variant="danger"
            type="reset"
            style={{
              alignSelf: "center",
              height: "fit-content",
              marginLeft: 5,
            }}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            style={{
              alignSelf: "center",
              height: "fit-content",
              marginLeft: 5,
            }}
            onClick={router.back}
          >
            Cancel
          </Button>
        </div>

        <ConfirmModal
          title="Are you sure?"
          btn1Text="Ok"
          btn2Text="Cancel"
          onFirst={() => {
            if (action === "emailStatus") {
            } else {
            }
          }}
        />
      </div>
    </>
  );
};
export default ManageTags;

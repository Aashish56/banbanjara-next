import { CKEditor } from 'ckeditor4-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Form, Row ,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
// import { getSingleAttraction } from 'redux/actions/attraction';
import { getSingleTag } from 'redux/actions/tag';

const AddFAQ = () => {

const dispatch = useDispatch();

const {tagPage} = useSelector(state=> state);
console.log('this is the TAg Page ------------> ' , tagPage);
const [faq , setFaq] = useState([{
    question : '',
    answer: '',
    order:'',
}]);

const router = useRouter();

const {id} = router.query;

useEffect(()=>{
  if(id){
   dispatch(getSingleTag(id));
  }
 },[id]);

//  useEffect(()=>{
//     if(attraction?.singleAttraction?.faq.length){
//         setFaq(attraction?.singleAttraction?.faq)
//     }
//  },[attraction])


const addMoreFaq = ()=>{
    setFaq((prev)=>{
      const prevData = [...prev , {
        question : '',
        answer: '',
        order:''
      }];
      return prevData;
    })
}


const faqValuesHandler = (event , index)=>{
          setFaq((prev)=>{
              const prevData = [...prev];
              prevData[index][event.target.name] = event.target.value;
              return prevData;
          })
}

const handleSubmit = async (e)=>{
    e.preventDefault();
     const data = await fetch('/api/tagPage/addFaq' , {
      method: 'post',
      headers: {'Content-Type':'application/json'}, 
      body : JSON.stringify({
        id : id,
        faq : faq
        })
     });
     const resp = await data.json();
     router.push('/admin/tags')
     console.log('this is the Response from the addFAq API ----------------> ' , resp)
}

const handleReset = ()=>{
    console.log('handle reset called ')
}



  return (
    <Card style={{ margin: "10px" }}>
      <Card.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "700", fontSize: "15px" }}>
         Faq Page
        </span>
        <Button variant="primary" style={{ width: 100 }} onClick={router.back}>
          <i style={{ fontSize: 12 }} className="bi bi-arrow-left"></i>
          {" Back"}
        </Button>
      </Card.Header>
     
      <Card.Body>
        <Form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <div style={{ marginBottom: "10px" }}>
          <Col
        className="mb-3"
        style={{
          border: "1px solid #afadad",
          padding: " 20px 10px",
          borderRadius: "3px",
        }}
      >
        <Row className='my-3'>
        {/* <Form.Group as={Col} controlId="formGridLabel2"> */}
            {faq?.map( (faq , i) => (
            <>
            <div className=' col-12 my-3'>
            <Form.Label>Question</Form.Label>
            <Form.Control type="text" name='question' value={faq.question} onChange={(e)=>faqValuesHandler(e , i)}/>
            </div>
            {/* <div className='col-md-4 my-3'>
            <Form.Label>Answer</Form.Label>
            <Form.Control type="text" name='answer' value={faq.answer} onChange={(e)=>faqValuesHandler(e , i)}/>
            </div> */}
            <div className='col-12 my-3'>
            <Form.Label>Order</Form.Label>
            <Form.Control type="text" name='order' value={faq.order} onChange={(e)=>faqValuesHandler(e , i )}/>
            </div>
            <Form.Group controlId="description">
            <Form.Label>
              Description <span className="tx-danger">*</span>
            </Form.Label>
            <CKEditor
              initData={
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} /> || ""
              }
              config={{
                toolbar: [
                  ["TextColor", "BGColor"],
                  ["Source"],
                  ["Styles", "Format", "Font", "FontSize"],
                  ["Bold", "Italic"],
                  ["Undo", "Redo"],
                  ["EasyImageUpload"],
                  ["About"],
                ],
              }}
              onChange={(v) => {
                const value = {
                  target:{
                    name:'answer',
                    value : v?.editor?.getData().trim()
                  }
                }
                faqValuesHandler(value , i)
                // attractionCardValueHandler("", , index , 'attractionCards') 
                // setDescription();
              }}
              // onBlur={() => handleBlur("", "description")}
              name="description"
            />
            {!faq?.answer && (
              <Form.Label style={{ color: "red" }}>
                Please Enter Answer
              </Form.Label>
            )}
          </Form.Group>

            </>
            ))}
            {/* </Form.Group> */}
        </Row>
        <div className='d-flex mt-4 justify-content-end'>
         <Button type='button' varient='primary' onClick={addMoreFaq}>Add More FAq</Button>
      </div>

        </Col>
        </div>
        <div style={{ display: "flex" }}>
              <Button
                variant="primary"
                type="submit"
                style={{
                  alignSelf: "center",
                  height: "fit-content",
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
        </Form>
     
       
        </Card.Body>
        </Card>
  )
}

export default AddFAQ
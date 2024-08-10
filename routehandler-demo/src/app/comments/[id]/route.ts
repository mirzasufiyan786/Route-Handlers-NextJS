import { redirect } from "next/navigation";
import { comments } from "../data";
            // -Dynamic get request handel with redirect handler-----
export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
if(parseInt(params.id) > comments.length){
    redirect("/comments")
}
    const comment = comments.find(
        (comment) => comment.id === parseInt(params.id)
    );

    // Ensure `comment` is not undefined
    if (!comment) {
        return new Response(
            JSON.stringify({ error: "Comment not found" }),
            {
                headers: { "Content-Type": "application/json" },
                status: 404
            }
        );
    }

    return new Response(
        JSON.stringify(comment),
        {
            headers: { "Content-Type": "application/json" },
            status: 200
        }
    );
}
                // ------PATCH request handeler-------
export async function PATCH(request:Request,
    {params}: {params:{id:string}})
     {
        const body = await request.json();
        const {text} = body
        const index = comments.findIndex(
            (comment) => comment.id === parseInt(params.id)
         );
         comments[index].text=text;
         return Response.json(comments[index]);
}
                            // -----DELETE request handler-----

    export async function DELETE(request:Request,{params}:{params:{id:string}}){

     const index = comments.findIndex(
        (comment) => comment.id === parseInt(params.id)
    );
    const deleteComment = comments[index]
    comments.splice(index,1);
    return Response.json(deleteComment)
    }
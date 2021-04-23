package PostServlets;
import PostWork.Service;
import PostWork.Post;
import com.google.gson.Gson;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class OnePost extends HttpServlet {

    private Service posts = Service.getInstance();

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str = request.getQueryString();
        String sID = str.substring(3, str.length());
        int id = Integer.parseInt(sID);
        response.getOutputStream().println("it Works id= " + id);
        if (posts.removePost(id)) {
            response.getOutputStream().println("deleted\n");
        } else {
            response.getOutputStream().println("Not found\n");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str = request.getQueryString();
        String sID = str.substring(3, str.length());
        int id = Integer.parseInt(sID);
        Post post = posts.getPost(id);

        if (post != null) {
            response.getWriter().print((new Gson()).toJson(posts.getPost(id)));
        } else {
            response.getOutputStream().println("Not found\n");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        String description = request.getParameter("description");
        String vendor = request.getParameter("vendor");
        String link = request.getParameter("link");
        String discount = request.getParameter("discount");
        Date date = new Date();
        String createdAt = date.toString();
        Date validUn = new Date();
        String validUntil = validUn.toString();

        Post post = new Post(id, description, createdAt, validUntil, vendor, link, discount, new ArrayList<>());

        response.getWriter().print((new Gson()).toJson(posts.getPost(id)));
        if (posts.addPost(post)) {
            response.getOutputStream().println("Success\n");
        } else {
            response.getOutputStream().println("Invalid\n");
        }
    }

}

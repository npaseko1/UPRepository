package PostServlets;
import PostWork.Post;
import PostWork.Service;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class PostList extends HttpServlet {

    private Service posts = Service.getInstance();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int top, skip;
        if (request.getParameter("skip") != null) {
            skip = Integer.parseInt(request.getParameter("skip"));
        } else {
            skip = 0;
        }
        if (request.getParameter("top") != null) {
            top = Integer.parseInt(request.getParameter("top"));
        } else {
            top = 0;
        }
        String vendor = request.getParameter("vendor");
        String createdAt = request.getParameter("createdAt");

        Map<String, String> filterConfig = new HashMap<>();
        if (vendor != null) {
            filterConfig.put("vendor", vendor);
            response.getOutputStream().println("yes we have vendor" + skip + top);
        }
        if (createdAt != null) {
            filterConfig.put("createdAt", createdAt);
        }
        List<Post> res = new ArrayList<>(posts.getPage(skip, top, filterConfig));
        if (res.size() == 0) {
            response.getOutputStream().println("Not found");
        } else {
            response.getOutputStream().println(posts.toJsonString(res));
        }
    }
}
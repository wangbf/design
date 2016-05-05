package vinux.web.demo.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import vinux.service.common.base.BaseController;
import vinux.service.common.exception.ECode;
import vinux.service.common.page.Pagination;
import vinux.service.common.statics.Constant;
import vinux.service.common.util.StringUtils;
import vinux.service.core.exception.VException;
import vinux.service.core.utils.LoggerUtils;
import vinux.service.entity.demo.Demo;
import vinux.web.demo.service.DemoService;
/**
 * 
 * 开发公司：九樱天下<br/>
 * 版权：九樱天下<br/>
 * <p>
 * 
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　周柏成　2015年4月30日 　<br/>
 * <p>
 * 
 * 系统页面跳转
 * 
 * <p>
 * @author zhou-baicheng
 * 
 * @version 1.0,2015年4月30日 <br/>
 * 
 */
@Controller
@Scope(Constant.SCOPE)
@RequestMapping("demo")
public class DemoSkipController extends BaseController {
	
	
	@Autowired
	DemoService iDemoService;

	@RequestMapping(value="activity",method=RequestMethod.GET)
	public ModelAndView activity(){
		return new ModelAndView("demo/activity");
	}
	@RequestMapping(value="blank",method=RequestMethod.GET)
	public ModelAndView blank(){
		return new ModelAndView("demo/blank");
	}
	@RequestMapping(value="files",method=RequestMethod.GET)
	public ModelAndView files(){
		return new ModelAndView("demo/files");
	}
	@RequestMapping(value="gallery",method=RequestMethod.GET)
	public ModelAndView gallery(){
		return new ModelAndView("demo/gallery");
	}
	@RequestMapping(value="help-inner",method=RequestMethod.GET)
	public ModelAndView help_inner(){
		return new ModelAndView("demo/help-inner");
	}
	@RequestMapping(value="help",method=RequestMethod.GET)
	public ModelAndView help(){
		return new ModelAndView("demo/help");
	}
	@RequestMapping(value="login",method=RequestMethod.GET)
	public ModelAndView login(){
		return new ModelAndView("demo/login");
	}
	@RequestMapping(value="messages",method=RequestMethod.GET)
	public ModelAndView messages(){
		return new ModelAndView("demo/messages");
	}
	@RequestMapping(value="profile",method=RequestMethod.GET)
	public ModelAndView profile(){
		return new ModelAndView("demo/profile");
	}
	@RequestMapping(value="projects",method=RequestMethod.GET)
	public ModelAndView projects(){
		return new ModelAndView("demo/projects");
	}
	@RequestMapping(value="settings",method=RequestMethod.GET)
	public ModelAndView settings(){
		return new ModelAndView("demo/settings");
	}
	@RequestMapping(value="tasks",method=RequestMethod.GET)
	public ModelAndView tasks(){
		return new ModelAndView("demo/tasks");
	}
	
	/**
	 * 查询数据 Demo
	 * @return
	 * author wjj
	 */
	@RequestMapping(value="list")
	public ModelAndView list(Integer pageNo){
		/**
		 * 如果需要加入查询的参数
		 * findMap.put("1",1)
		 */
		Pagination<Demo> page = iDemoService.findByPageBySqlId("selectAll", findMap,pageNo,pageSize);
		
		return new ModelAndView("demo/list","page",page);
	}
	
	
	/**
	 * 跳转ajax列表页面
	 * author wjj
	 */
	@RequestMapping(value="ajax",method=RequestMethod.GET)
	public ModelAndView ajax(Integer pageNo){
		Pagination<Demo> page = iDemoService.findByPageBySqlId("selectAll", findMap,pageNo,pageSize);
		
		return new ModelAndView("demo/ajax","page",page);
	}
	
	
	/**
	 * ajax分页获取数据
	 * @param attributeBO
	 * @return
	 * author wjj
	 */
	@RequestMapping(value="ajaxselect")
	@ResponseBody
	public Pagination<Demo> ajaxselect(Integer pageNo){
		Pagination<Demo> page = iDemoService.findByPageBySqlId("selectAll", findMap,pageNo,pageSize);
		return page;
	}
	
	/**
	 * 跳转insert页面
	 * author wjj
	 */
	@RequestMapping(value="toInsert",method=RequestMethod.GET)
	public ModelAndView toInsert(){
		return new ModelAndView("demo/insert");
	}
	
	/**
	 * 跳转insert页面 
	 * author wjj
	 */
	@RequestMapping(value="toAjaxInsert",method=RequestMethod.GET)
	public ModelAndView toAjaxInsert(){
		return new ModelAndView("demo/ajaxInsert");
	}
	
	/**
	 * 保存信息
	 * author wjj
	 */
	@RequestMapping(value="saveOrUpdate",method=RequestMethod.POST) 
	public ModelAndView saveOrUpdate(Demo demo){
		if(StringUtils.isBlank(demo,demo.getId())){
			demo.setCreateDate(new Date());
			demo.setOther("");
			demo = iDemoService.insert(demo);
			if(null == demo){
				LoggerUtils.fmtError(getClass(), "保存 Demo 失败 !");
				throw new VException(ECode.C_ERROR,"保存 Demo 失败 !");
			}
		}else{
			int num = iDemoService.updateByPrimaryKey(demo);
			if(num>0){
				LoggerUtils.debug(getClass(), "更新成功");
			}
		}
		//重定向到列表页
		return redirect("list.vhtml");
	}
	/**
	 * 保存信息 ajax
	 * author wjj
	 */
	@RequestMapping(value="ajax/saveOrUpdate",method=RequestMethod.POST) 
	@ResponseBody
	public Map<String,Object> ajaxSaveOrUpdate(Demo demo){
		if(StringUtils.isBlank(demo,demo.getId())){
			demo.setCreateDate(new Date());
			demo.setOther("");
			demo = iDemoService.insert(demo);
			if(null == demo){
				resultMap.put("message", "保存 Demo 失败 !");
				resultMap.put("status", 500);
			}else{
				resultMap.put("message", "保存 成功 !");
				resultMap.put("status", 200);
			}
		}else{
			int num = iDemoService.updateByPrimaryKey(demo);
			if(num>0){
				LoggerUtils.debug(getClass(), "更新成功");
				resultMap.put("message", "更新成功 !");
				resultMap.put("status", 200);
			}
		}
		return resultMap;
		
	}
	
	/**
	 * 删除信息
	 * author wjj
	 */
	@RequestMapping(value="delete/{id}",method=RequestMethod.GET)
	public ModelAndView deleteById(@PathVariable("id")Long id){
		int num = iDemoService.deleteByPrimaryKey(Long.valueOf(id));
		if(num>0){
			LoggerUtils.fmtDebug(getClass(),"删除成功,成功删除记录数：%s",num);
		}
		//重定向到列表页
		return redirect("/demo/list.vhtml");
	}
	
	
	/**
	 * Ajax删除信息
	 * author wjj
	 */
	@RequestMapping(value="deleteAjax",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> deleteAjax(Long id){
		int num = iDemoService.deleteByPrimaryKey(Long.valueOf(id));
		if(num>0){
			LoggerUtils.fmtDebug(getClass(),"删除成功,成功删除记录数：%s",num);
			resultMap.put("status", 200);
		}else{
			resultMap.put("status", 500);
		}
		return resultMap;
	}
	
	
	/**
	 * 跳转修改页面
	 * author wjj
	 */
	@RequestMapping(value="toUpdate/{id}",method=RequestMethod.GET)
	public ModelAndView toUpdate(@PathVariable("id")Long id){
		Demo demo = iDemoService.selectByPrimaryKey(id);
		return  new ModelAndView("demo/update","demo",demo);
	}
	/**
	 * 跳转修改页面
	 * author wjj
	 */
	@RequestMapping(value="toAjaxUpdate/{id}",method=RequestMethod.GET)
	public ModelAndView toAjaxUpdate(@PathVariable("id")Long id){
		Demo demo = iDemoService.selectByPrimaryKey(id);
		return  new ModelAndView("demo/ajax_update","demo",demo);
	}
	
	
	/**
	 * 传入多个参数,支持中文
	 * 跳转修改页面
	 * author wjj
	 */
//	@RequestMapping(value="toAjaxUpdate/{id}/{name}",method=RequestMethod.GET)
//	public ModelAndView toAjaxUpdate(@PathVariable("id")Long id,@PathVariable("name")String name){
//		String fullname = name;//可直接使用
//		Demo demo = iDemoService.selectByPrimaryKey(id);
//		return  new ModelAndView("demo/ajax_update","demo",demo);
//	}
	
	
	
}

class AchievementsController < ApplicationController
  
  before_action :authentication_check, :except => [:show]
  
  # GET /achievements
  # GET /achievements.xml
  def index
    @achievements = Achievement.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @achievements }
    end
  end

  # GET /achievements/1
  # GET /achievements/1.xml
  def show
    @achievement = params[:id].to_i != 0 ? Achievement.find(params[:id]) : Achievement.find_by_label(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @achievement }
      format.json { render :json => @achievement.frontend_hash }
    end
  end

  # GET /achievements/new
  # GET /achievements/new.xml
  def new
    @achievement = Achievement.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @achievement }
    end
  end

  # GET /achievements/1/edit
  def edit
    @achievement = Achievement.find(params[:id])
  end

  # POST /achievements
  # POST /achievements.xml
  def create
    @achievement = Achievement.new(params[:achievement])

    respond_to do |format|
      if @achievement.save
        format.html { redirect_to(@achievement, :notice => 'Achievement was successfully created.') }
        format.xml  { render :xml => @achievement, :status => :created, :location => @achievement }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @achievement.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /achievements/1
  # PUT /achievements/1.xml
  def update
    @achievement = Achievement.find(params[:id])

    respond_to do |format|
      if @achievement.update_attributes(params[:achievement])
        format.html { redirect_to(@achievement, :notice => 'Achievement was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @achievement.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /achievements/1
  # DELETE /achievements/1.xml
  def destroy
    @achievement = Achievement.find(params[:id])
    @achievement.destroy

    respond_to do |format|
      format.html { redirect_to(achievements_url) }
      format.xml  { head :ok }
    end
  end
end
